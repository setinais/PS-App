import {Injectable} from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable({
    providedIn: 'root'
})
export class SqliteService {
    private database: any;

    constructor(){
        (new Sqlite("ps.db")).then(db => {
            this.database = db;
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    // public insert() {
    //     this.database.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", ["Nic", "Raboy"]).then(id => {
    //         console.log("INSERT RESULT", id);
    //         this.fetch();
    //     }, error => {
    //         console.log("INSERT ERROR", error);
    //     });
    // }

    // public fetch() {
    //     this.database.all("SELECT * FROM people").then(rows => {
    //         this.people = [];
    //         for(var row in rows) {
    //             this.people.push({
    //                 "firstname": rows[row][1],
    //                 "lastname": rows[row][2]
    //             });
    //         }
    //     }, error => {
    //         console.log("SELECT ERROR", error);
    //     });
    // }

}
