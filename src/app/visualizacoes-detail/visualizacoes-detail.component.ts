import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocalizacaoModel, VisualizacaoModel} from "~/models/visualizacao.model";
import * as utils from "tns-core-modules/utils/utils";
import * as TNSPhone from "nativescript-phone";

@Component({
  selector: 'ns-visualizacoes-detail',
  templateUrl: './visualizacoes-detail.component.html',
  styleUrls: ['./visualizacoes-detail.component.css']
})
export class VisualizacoesDetailComponent implements OnInit {

    private dados: VisualizacaoModel =
{
        nome: 'Hospital Modelo',
        localizacao: {latitude: -10.1753214, longitude: -48.8849307},
        endereco: 'Rua Tapajós, Quadra 24, Lote1, 260 ',
        bairro: 'Centro',
        telefone: '(63) 3602-1188',
        imagem: '~/imagens/setembroamarelo.jpg',
        descricao: 'Posto Avançado de saude, destinado ao atendimento rapido de cidadões que apresentam sintomas de doenças de possivel tratamento na unidade atual. Se identificado a incapacidade da UBS, o paciente sera encaminhado ao Hospital mais proximo.',
        servicos: [
            { s: 'ESTRATEGIA DE SAUDE DA FAMILIA', c: 'SAUDE BUCAL MI' },
            { s: 'ESTRATEGIA DE SAUDE DA FAMILIA', c: 'SAUDE DA FAMILIA' },
            { s: 'SERVICO DE ATENCAO A SAUDE DO TRABALHADOR', c: 'ATENDIMENTO ACOMPANHAMENTO EM SAUDE DO TRABALHADOR' },
            { s: 'SERVICO DE ATENCAO AO PACIENTE COM TUBERCULOSE', c: 'DIAGNOSTICO E TRATAMENTO' },
        ],
        created_at: 'string'
    }

    private length_dados: string

  constructor(private route: ActivatedRoute) {
      // this.dados = this.route.queryParams['_value']
      console.log(this.dados)
      this.lenghtDados();
  }

  ngOnInit() {
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
}
