

import { Injectable } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { RouterExtensions } from 'nativescript-angular';
import { getString } from 'tns-core-modules/application-settings/application-settings';

@Injectable({
    providedIn: 'root'
})
export class DiarioSaudeService {

    constructor(private db: SqliteService,
                private routerExtentions: RouterExtensions){}

    diarioQuestion() {
        let now = new Date();
        this.db.fetchSaudeDiaria("day = " + now.getDate() + " and month = " +( now.getMonth() + 1) +  " and year = " + now.getFullYear() + " and user_id = " + getString("user_id")).then(res => {
            console.log(res)
            if (res.length == 0) {
                this.routerExtentions.navigate(['/diario-saude'])
            } else {
                this.routerExtentions.navigate(['/home'])
            }
        })
    }
}