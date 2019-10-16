import {Component, OnInit} from '@angular/core';
import {LocalRiscoModel} from "~/models/local-risco.model";
import {LocalizacaoModel} from "~/models/visualizacao.model";
import * as utils from "tns-core-modules/utils/utils";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: 'ns-local-risco',
  templateUrl: './local-risco.component.html',
  styleUrls: ['./local-risco.component.css']
})
export class LocalRiscoComponent implements OnInit {

    private dados: Array<LocalRiscoModel> = [
        {
            id: 1,
            nome: 'Hospital Regional de Paraíso ',
            localizacao: {latitude: -10.1808948, longitude: -48.9131606},
            endereco: 'RUA 03 QD 02 LT 01 A 19 ',
            bairro: 'Setor Aeroporto',
            imagens: ['~/imagens/logo.png', '~/imagens/logo.png'],
            created_at: '1998-04-02 22:20'
        },
        {
            id: 2,
            nome: 'Hospital Modelo',
            localizacao: {latitude: -10.1753214, longitude: -48.8849307},
            endereco: 'Rua Tapajós, Quadra 24, Lote1, 260 ',
            bairro: 'Centro',
            imagens: ['~/imagens/logo.png', '~/imagens/logo.png'],
            created_at: '1998-04-02 22:20'
        },
        {
            id: 3,
            nome: 'Centro Médico Paraíso',
            localizacao: {latitude: -10.1749416, longitude: -48.8848086},
            endereco: 'Rua Mal Rondon Q 25, 104 lt 7 ',
            bairro: 'S Central ',
            imagens: ['~/imagens/logo.png', '~/imagens/logo.png'],
            created_at: '1998-04-02 22:20'
        },

    ]
  constructor(private router: RouterExtensions) { }

  ngOnInit() {
  }
    onNavigate(localizacao: LocalizacaoModel){
        utils.openUrl(`http://maps.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}`)
    }
    onDetail(dado){

    }
}
