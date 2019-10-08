import {ItemEventData} from "tns-core-modules/ui/list-view"
import {Component, OnInit} from '@angular/core';
import {LocalizacaoModel, VisualizacaoModel} from "~/app/models/visualizacao.model";
import {Page} from "tns-core-modules/ui/page";
import {RouterExtensions} from "nativescript-angular";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import * as utils from "tns-core-modules/utils/utils";

@Component({
    selector: 'ns-visualizacoes',
    templateUrl: './visualizacoes.component.html',
    styleUrls: ['./visualizacoes.component.css']
})
export class VisualizacoesComponent implements OnInit {

    private dados_farmacia: Array<VisualizacaoModel> = [
    ]
    private dados_hospital: Array<VisualizacaoModel> = [
        {
            type: 'H',
            id: 1,
            nome: 'Hospital Regional de Paraíso ',
            localizacao: {latitude: -10.1808948, longitude: -48.9131606},
            endereco: 'RUA 03 QD 02 LT 01 A 19 ',
            bairro: 'Setor Aeroporto',
            telefone: '(63) 3904-1200',
            created_at: 'string'
        },
        {
            type: 'H',
            id: 1,
            nome: 'Hospital Modelo',
            localizacao: {latitude: -10.1753214, longitude: -48.8849307},
            endereco: 'Rua Tapajós, Quadra 24, Lote1, 260 ',
            bairro: 'Centro',
            telefone: '(63) 3602-1188',
            created_at: 'string'
        },
        {
            type: 'H',
            id: 1,
            nome: 'Centro Médico Paraíso',
            localizacao: {latitude: -10.1749416, longitude: -48.8848086},
            endereco: 'Rua Mal Rondon Q 25, 104 lt 7 ',
            bairro: 'S Central ',
            telefone: '(63) 3602-1399',
            created_at: 'string'
        },

    ]
    private dados_uni_base_saude: Array<VisualizacaoModel> = [
        {
            type: 'H',
            id: 1,
            nome: 'UBS Norte Paraiso ',
            localizacao: {latitude: -10.174507, longitude: -48.900191},
            endereco: 'Rua Dom Pedro Ii Qd 151 Lt10',
            bairro: 'Jardim Paulista ',
            telefone: '(63) 3904-1442',
            created_at: 'string'
        },
        {
            type: 'H',
            id: 1,
            nome: 'UBS Sul Paraiso',
            localizacao: {latitude: -10.194348, longitude: -48.889405},
            endereco: 'Avenida 23 De Outubro',
            bairro: 'Pouso Alegre',
            telefone: '(63) 3904-1443',
            created_at: 'string'
        },
        {
            type: 'H',
            id: 1,
            nome: 'UBS Vila Milena Paraiso',
            localizacao: {latitude: -10.160145, longitude: -48.887119},
            endereco: 'Av Santos Dumont',
            bairro: 'Vila Milena',
            telefone: '(63) 3904-1579',
            created_at: 'string'
        },
        {
            type: 'H',
            id: 1,
            nome: 'UBS Sespe Paraiso',
            localizacao: {latitude: -10.180484, longitude: -48.887435},
            endereco: 'Rua Santos Dumont',
            bairro: 'Centro',
            telefone: '(63) 3602-3775',
            created_at: 'string'
        },
        {
            type: 'H',
            id: 1,
            nome: 'UBS Oeste Paraiso',
            localizacao: {latitude: 2, longitude: 4},
            endereco: 'Rua Bernadino Maciel',
            bairro: 'Setor Aeroporto',
            telefone: '(63) 3904-1445',
            created_at: 'string'
        },
    ]

    private dados: Array<VisualizacaoModel>

    private title: string
    constructor(private page: Page,
                private _router: RouterExtensions,
                private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        let type = this.route.snapshot.queryParams['type']
        this.title = this.route.snapshot.queryParams['title']
        switch (type) {
            case 'U':
                this.dados = this.dados_uni_base_saude
                break;
            case 'F':
                this.dados = this.dados_farmacia
                break;
            case 'H':
                this.dados = this.dados_hospital
                break;
        }

    }

    onNavigate(localizacao: LocalizacaoModel){
        utils.openUrl(`http://maps.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}`)
    }

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }

    onDetail(id: number){

    }
}
