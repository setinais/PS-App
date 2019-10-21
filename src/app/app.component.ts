import { Component } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(){
        (new Sqlite("ps.db")).then( db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS saude (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT)").then( id => {
                console.log("Table saude criada")
            }, error => {
                console.log("CREATE saude TABLE ERROR", error);
            });
            db.execSQL("CREATE TABLE IF NOT EXISTS tipos (id INTEGER PRIMARY KEY AUTOINCREMENT, saude_id INT, name TEXT)").then( id => {
                console.log("Table tipos criada")
            }, error => {
                console.log("CREATE tipos TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }
}
