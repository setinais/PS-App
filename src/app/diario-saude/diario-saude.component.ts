import {Component, OnInit} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Saude } from './saude.model';
import { SqliteService } from '../services/sqlite.service';
import { DiarioSaudeService } from './diario-saude.service';
import { getString } from 'tns-core-modules/application-settings/application-settings';

@Component({
  selector: 'ns-diario-saude',
  templateUrl: './diario-saude.component.html',
  styleUrls: ['./diario-saude.component.css']
})
export class DiarioSaudeComponent implements OnInit {
   
    insert: boolean = false;

    constructor(private routerExtensions: RouterExtensions,
                private db: SqliteService,
                private diarioService: DiarioSaudeService) {
      
    }

    ngOnInit() {
    }

    redirectHome() {
        let date: Date = new Date()
        let saude: Saude = {
            name: 'Bem',
            user_id: getString("user_id"),
            day: date.getDate().toString(),
            month: date.getMonth().toString(),
            year: date.getFullYear().toString(),
            hours: date.getHours().toString(),
            minutes: date.getMinutes().toString(),
            tipos: []
        }
        this.insert=true;
        this.db.insertSaudeDiaria(saude).then(res => {
            this.insert=false;
            this.routerExtensions.navigate(['home'], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'slideTop',
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
                curve: 'ease'
            }
        })
    }

    goBack() {
        this.diarioService.diarioQuestion()
    }

}
