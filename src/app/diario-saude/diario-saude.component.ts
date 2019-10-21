import {Component, OnInit} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Saude } from './saude.model';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'ns-diario-saude',
  templateUrl: './diario-saude.component.html',
  styleUrls: ['./diario-saude.component.css']
})
export class DiarioSaudeComponent implements OnInit {
   

    constructor(private routerExtensions: RouterExtensions,
                private db: SqliteService) {
      
    }

    ngOnInit() {
    }

    redirectHome() {
        let saude: Saude = {
            name: 'Bem',
            date: new Date(),
            tipos: []
        }
        this.db.insertSaudeDiaria(saude).then(res => {
            this.routerExtensions.navigate(['home'], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'slideTop',
                    duration: 500,
                    curve: 'ease'
                }
            })
        });
        
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
