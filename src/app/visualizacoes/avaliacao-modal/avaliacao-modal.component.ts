import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogOptions, ModalDialogParams, ModalDialogService} from "nativescript-angular";
import {VisualizacoesComponent} from "~/app/visualizacoes/visualizacoes.component";
import {Accuracy} from "tns-core-modules/ui/enums";
import any = Accuracy.any;
import {AvaliacaoService} from "~/services/avaliacao.service";
import {AvaliacaoModel} from "~/models/avaliacao.model";

@Component({
  selector: 'ns-avaliacao-modal',
  templateUrl: './avaliacao-modal.component.html',
  styleUrls: ['./avaliacao-modal.component.css'],
    providers: [ModalDialogService]
})
export class AvaliacaoModalComponent implements OnInit{

    status: boolean
    private id: number
    private nome: string

    private a1: Array<boolean> = []
    private s1: Array<boolean> = []
    private e1: Array<boolean> = []

    private avaliacao: AvaliacaoModel

    private load: boolean = false
    private alert: boolean = false

    constructor(private params: ModalDialogParams, private avaliacaoService: AvaliacaoService) {
        this.id = this.params.context.id;
        this.avaliacao = new AvaliacaoModel;
        this.avaliacao.informacoe_id = this.id;
        this.nome = this.params.context.nome;
    }
    ngOnInit(){
    }
    valorEstrelaA(val: number, nota: number){
        this.a1 = this.switchAvaliacao(this.a1, val)
        this.avaliacao.tempo_de_espera = nota
    }
    valorEstrelaS(val: number, nota: number){
        this.s1 = this.switchAvaliacao(this.s1, val)
        this.avaliacao.servidor_publico = nota
    }
    valorEstrelaE(val: number, nota: number){
        this.e1 = this.switchAvaliacao(this.e1, val)
        this.avaliacao.estrutura = nota
    }

    switchAvaliacao(campo: Array<boolean>, val: number){
        switch (val) {
            case 0:
                campo[4] = true
            case 1:
                campo[3] = true
            case 2:
                campo[2] = true
            case 3:
                campo[1] = true
            case 4:
                campo[0] = true
        }
        switch (val-1) {
            case 4:
                campo[0] = false
            case 3:
                campo[1] = false
            case 2:
                campo[2] = false
            case 1:
                campo[3] = false
            case 0:
                campo[4] = false
        }
        return campo;
    }

    store(){
        this.avaliacaoService.store(this.avaliacao).subscribe(response => {

        }, error => {});
    }
    close(){
        this.params.closeCallback();
    }
}
