import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    private pesocalculado
    constructor() { }
    private valpeso;
    ngOnInit() {
    }
    urlCuriosidade(){
        utils.openUrl(`https://www.google.com/search?rlz=1C1CHZL_pt-BRBR735BR735&sxsrf=ACYBGNSW35EpiAtYWuP7fsMGfzyI_maBQw%3A1571770885183&ei=BVKvXZLtCuOc5OUP1MKu0As&q=imc+peso+altura+tudo+sobre&oq=imc+peso+altura+tudo+sobre&gs_l=psy-ab.3..33i160.4398636.4406061..4406173...0.1..0.250.4088.2-18......0....1..gws-wiz.......0i71j0i67j0i131j0j35i39j35i39i19j0i22i30j0i22i10i30j33i22i29i30.VAOm_H7mb4o&ved=0ahUKEwjSg57qxrDlAhVjDrkGHVShC7oQ4dUDCAs&uact=5`)
    }
    getColor(val: number){
        let color = '';
        if( val > 40.0){
            color = '#BE0926';
        }else if( val < 18.5){
            color  ='#2EAADC';
        }else if( val > 18.5 && val < 24.9){
            color = '#0F8B2D';
        }else if( val > 24.9 && val < 29.9){
            color = '#F29400';
        }else if( val > 29.9 && val < 40.0){
            color = '#E8511D';
        }else{
            color = '#c0c0c0'
        }
        return color;

    }
}
