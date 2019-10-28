import {ItemEventData} from "tns-core-modules/ui/list-view"
import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LocalizacaoModel, VisualizacaoModel} from "~/models/visualizacao.model";
import { Page} from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";
import {ModalDialogOptions, ModalDialogParams, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from "@angular/router";
import * as utils from "tns-core-modules/utils/utils";
import * as TNSPhone from "nativescript-phone";
import {hospital, ubs} from "~/configs/dados-ubs";
import {BannerService} from "~/services/banner.service";
import {AvaliacaoModalComponent} from "~/app/visualizacoes/avaliacao-modal/avaliacao-modal.component";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {AnimationDefinition, Animation} from "tns-core-modules/ui/animation";
@Component({
    selector: 'ns-visualizacoes',
    templateUrl: './visualizacoes.component.html',
    styleUrls: ['./visualizacoes.component.css'],
    providers: [ModalDialogService]
})
export class VisualizacoesComponent implements OnInit {

    private dados: Array<VisualizacaoModel>
    private showMessage: boolean = false
    private success: boolean = false
    private background: any
    private message: string = "";
    private title: string



    constructor(private page: Page,
                private _router: RouterExtensions,
                private route: ActivatedRoute,
                private visu: BannerService,
                private modalService: ModalDialogService,
                private _vcRef: ViewContainerRef,
    ) {
    }

    ngOnInit() {
        let type = this.route.snapshot.queryParams['type']
        this.title = this.route.snapshot.queryParams['title']
        switch (type) {
            case 'U':
                this.visu.getUbs().subscribe(response => {this.dados = response['data']}, error => {alert('Servidor fora do ar!')})
                break;
            case 'H':
                this.visu.getHospitais().subscribe(response => {this.dados = response['data']}, error => {alert('Servidor fora do ar!')})
                break;
            default:
                this.title = 'Unidades Básicas de Saúde - UBS'
                this.dados = ubs
        }

    }

    onNavigate(localizacao: LocalizacaoModel){
        utils.openUrl(`http://maps.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}`)
    }

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }
    onDetail(id: number){}
    phone(telefone){
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
