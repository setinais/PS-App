import { Component } from "@angular/core";
import {getString} from "tns-core-modules/application-settings";
import {RouterExtensions} from "nativescript-angular";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(private route: RouterExtensions){
        (new Sqlite("ps.db")).then( db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS saude (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, user_id TEXT, day TEXT, month TEXT, year TEXT, hours TEXT, minutes TEXT)").then( id => {

            }, error => {

            });
            db.execSQL("CREATE TABLE IF NOT EXISTS tipos (id INTEGER PRIMARY KEY AUTOINCREMENT, saude_id INT, category TEXT, name TEXT)").then( id => {

            }, error => {

            });
        }, error => {

        });
        if(getString("token"))
            this.route.navigate(['/home'], {clearHistory: true})
    }

}
