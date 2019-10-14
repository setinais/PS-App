import { Component } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    private database: any;
    public perguntas: Array<any>;

    constructor(){
        this.perguntas = [];
        (new Sqlite("ps.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, resposta TEXT)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE perguntas TABLE ERROR", error);
            });


        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }
}
