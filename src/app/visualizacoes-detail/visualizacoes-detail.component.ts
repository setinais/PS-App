import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocalizacaoModel, VisualizacaoModel} from "~/models/visualizacao.model";
import * as utils from "tns-core-modules/utils/utils";
import * as TNSPhone from "nativescript-phone";
import {hospital, ubs} from "~/configs/dados-ubs";
import {BannerService} from "~/services/banner.service";

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

  constructor(private route: ActivatedRoute, private visu: BannerService) {}


  ngOnInit() {
      this.visu.getUbsHid(this.route.queryParams['_value'].id).subscribe(response => {
          this.dados = response['data']
          this.imagens.push(response['data']['imagem'][0])
          this.lenghtDados()
      }, error => {alert('Servidor fora do ar!')})

  }

  selectDetail(id: number){
        for(let i = 0; i< ubs.length; i++){
            if(id == ubs[i].id){
                this.dados = ubs[i]
            }
        }
        if(this.dados == undefined){
            for(let i = 0; i< hospital.length; i++){
                if(id == hospital[i].id){
                    this.dados = hospital[i]
                }
            }
        }

  }
    pageChanged(event){

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
