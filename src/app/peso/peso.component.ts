import {Component, OnInit, ViewChild} from '@angular/core';
import {FloatLabelAgua} from "~/styles/float-label-agua";
import * as utils from "tns-core-modules/utils/utils";

@Component({
  selector: 'ns-peso',
  templateUrl: './peso.component.html',
  styleUrls: ['./peso.component.css']
})
export class PesoComponent implements OnInit {

    @ViewChild('peso', {static: false}) peso: FloatLabelAgua
    @ViewChild('altura', {static: false}) altura: FloatLabelAgua
    constructor() { }
    private valpeso;
    ngOnInit() {
    }
    urlCuriosidade(){
        utils.openUrl(`https://ciclovivo.com.br/planeta/meio-ambiente/17-curiosidades-sobre-a-agua-que-voce-talvez-nao-saiba/`)
    }
    definirCor(){
        let imc = this.peso.value / ((this.altura.value / 100) * (this.altura.value / 100))
        console.log(imc)
    }
}
