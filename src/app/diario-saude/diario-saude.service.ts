

import { Injectable } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { RouterExtensions } from 'nativescript-angular';

@Injectable({
    providedIn: 'root'
})
export class DiarioSaudeService {

    constructor(private db: SqliteService,
                private routerExtentions: RouterExtensions){}

    diarioQuestion() {
        let now = new Date();
        this.db.fetchSaudeDiaria(now.getDate(), now.getMonth(), now.getFullYear()).then(res => {
            if( res.length == 0) {
                this.routerExtentions.navigate(['/diario-saude'])
            } else {
                this.routerExtentions.navigate(['/home'])
            }
        })
    }
}