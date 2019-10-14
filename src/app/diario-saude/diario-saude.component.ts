import {Component, OnInit} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-diario-saude',
  templateUrl: './diario-saude.component.html',
  styleUrls: ['./diario-saude.component.css']
})
export class DiarioSaudeComponent implements OnInit {
   

    constructor(private routerExtensions: RouterExtensions) {
      
    }

    ngOnInit() {
    }

    redirectHome() {
        this.routerExtensions.navigate(['home'], {
            clearHistory: true,
            animated: true,
            transition: {
                name: 'slideTop',
                duration: 500,
                curve: 'ease'
            }
        })
    }

    redirectPerguntas() {
        this.routerExtensions.navigate(['diario-saude-perguntas'], {
            animated: true,
            transition: {
                name: 'slideTop',
                duration: 500,
                curve: 'ease'
            }
        })
    }

}
