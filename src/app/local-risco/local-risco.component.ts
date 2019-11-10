import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LocalRiscoModel} from "~/models/local-risco.model";
import {LocalizacaoModel} from "~/models/visualizacao.model";
import * as utils from "tns-core-modules/utils/utils";
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {ModalComponent} from "~/app/modal/modal.component";
import {LocalRiscoService} from "~/services/local-risco.service";

@Component({
    selector: 'ns-local-risco',
    providers: [ModalDialogService],
    templateUrl: './local-risco.component.html',
    styleUrls: ['./local-risco.component.css']
})
export class LocalRiscoComponent implements OnInit {

    private dados: Array<LocalRiscoModel> = []
  constructor(private router: RouterExtensions,
              private modalService: ModalDialogService,
              private viewContainerRef: ViewContainerRef,
              private lrService: LocalRiscoService) { }

  ngOnInit() {
        this.lrService.index().subscribe(response => {
            this.dados = response['data'];
        }, error => {
        })
  }
    onNavigate(localizacao: LocalizacaoModel){
        utils.openUrl(`http://maps.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}`)
    }
    onDetail(dado){

    }
    showImage(dado: LocalRiscoModel){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {
                text: dado.descricao,
                endereco: dado.endereco,
                image: dado.imagem,
                bairro: dado.bairro
            }
        };
        this.modalService.showModal(ModalComponent, options);
    }
}

