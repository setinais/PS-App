import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocalizacaoModel, VisualizacaoModel} from "~/models/visualizacao.model";
import * as utils from "tns-core-modules/utils/utils";
import * as TNSPhone from "nativescript-phone";
import {hospital, ubs} from "~/configs/dados-ubs";
import {BannerService} from "~/services/banner.service";
import {ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import {AvaliacaoModalComponent} from "~/app/visualizacoes/avaliacao-modal/avaliacao-modal.component";

@Component({
  selector: 'ns-visualizacoes-detail',
  templateUrl: './visualizacoes-detail.component.html',
  styleUrls: ['./visualizacoes-detail.component.css']
})
export class VisualizacoesDetailComponent implements OnInit {

    private dados: VisualizacaoModel = undefined
    private imagens: any[] = []
    private slideNumber = 1;
    private length_dados: string

    private showMessage: boolean = false
    private success: boolean = false
    private background: any
    private message: string = "";
    private title: string

  constructor(private route: ActivatedRoute, private visu: BannerService, private modalService: ModalDialogService, private _vcRef: ViewContainerRef) {}


  ngOnInit() {
      this.visu.getUbsHid(this.route.queryParams['_value'].id).subscribe(response => {
          this.dados = response['data']
          this.imagens.push(response['data']['imagem'][0])
          this.lenghtDados()
      }, error => {alert('Servidor fora do ar!'); console.log(error)})

  }

  lenghtDados(){
        this.length_dados = "";
        for (let i = 0; i< this.dados.servicos.length+1; i++){
            if(i == (this.dados.servicos.length)) {
                this.length_dados += 'auto'
                return;
            }
            this.length_dados += 'auto, '
        }
  }
    onNavigate(localizacao: LocalizacaoModel){
        utils.openUrl(`http://maps.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}`)
    }

    onPhone(telefone){
        TNSPhone.requestCallPermission('Você deve aceitar a permissão para fazer chamada!.')
            .then(() => TNSPhone.dial(telefone, false))
            .catch(() => TNSPhone.dial(telefone, true));
    }

    showAvalicao(id, nome){
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {id: id, nome: nome},
            fullscreen: false
        };

        this.modalService.showModal(AvaliacaoModalComponent, options)
            .then((result: any) => {
                this.showMessageModal(result.message, result.status)
            });
    }

    showMessageModal(message: string, status: boolean){
        this.message = message
        this.showMessage = true
        this.success = status;
        this.background = 'rgba(254,19,23,0.7)'
        if(status)
            this.background = 'rgba(42,183,20,0.8)'
        setTimeout(() => {
            this.showMessage = false
        }, 3000);
    }
}
