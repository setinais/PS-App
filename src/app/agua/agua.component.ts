import {Component, OnInit, ViewChild} from '@angular/core';
import {FloatLabelAgua} from "~/styles/float-label-agua";
import * as utils from "tns-core-modules/utils/utils";

@Component({
  selector: 'ns-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.css']
})
export class AguaComponent implements OnInit {

    @ViewChild('peso', {static: false}) peso: FloatLabelAgua
  constructor() { }

  ngOnInit() {
  }
    urlCuriosidade(){
        utils.openUrl(`https://ciclovivo.com.br/planeta/meio-ambiente/17-curiosidades-sobre-a-agua-que-voce-talvez-nao-saiba/`)
    }

}
