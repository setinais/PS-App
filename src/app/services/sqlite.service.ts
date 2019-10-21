import {Injectable} from "@angular/core";
import { Saude } from "../diario-saude/saude.model";
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

    insertSaudeDiaria(saude: Saude): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.execSQL("INSERT INTO saude (name, date) VALUES (?, ?)", [saude.name, saude.date.toDateString]).then(id => {
                console.log("INSERT RESULT SAUDE", id);
                if (saude.tipos.length > 0) {
                    saude.tipos.forEach((value, index) => {
                        this.database.execSQL("INSERT INTO tipos (saude_id, name) VALUES (?, ?)", [id, value.name]).then(id => {
                            console.log("INSERT RESULT TIPOS", id);
                        }, error => {
                            console.log("INSERT ERROR", error);
                        })
                    })               
                }
                resolve();
            }, error => {
                console.log("INSERT ERROR", error);
                reject();
            });  
        })        

    }



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
