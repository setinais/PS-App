import {Injectable} from "@angular/core";
import { Saude } from "../diario-saude/saude.model";
import { Tipo } from "../diario-saude-perguntas/tipo.model";
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
            console.log(saude.month +1)
            this.database.execSQL("INSERT INTO saude (name, day, month, year, hours, minutes) VALUES (?, ?, ?, ?, ?, ?)", [saude.name, saude.day, (parseInt(saude.month) + 1), saude.year, saude.hours, saude.minutes]).then(id => {
                console.log("INSERT RESULT SAUDE", id);
                if (saude.tipos.length > 0) {
                    saude.tipos.forEach((value, index) => {
                        this.database.execSQL("INSERT INTO tipos (saude_id, category, name) VALUES (?, ?, ?)", [id,  value.category, value.name]).then(id => {
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

    public fetchSaudeDiaria(day = null, month = null, year = null, id = null): Promise<any> {
        return new Promise((resolve, reject) => {
            let sql: string;
            if (day != null || month != null || year != null || id != null) {
                sql = `SELECT * FROM saude WHERE ${day == null ? '' : 'day='+day+' and '}${month == null ? '' : 'month='+(parseInt(month) + 1)+' and '}${year == null ? '': 'year='+year}${id == null ? '': 'id='+id}`;
            } else {
                sql = "SELECT * FROM saude";
            }       
            // console.log(sql)
            this.database.all(sql).then(rows => {
                console.log("SELECT EXECULTADO")
                let saude = [];            
                for(var row in rows) {                
                    
                    this.database.all("SELECT * FROM tipos WHERE saude_id = " + rows[row][0]).then(rowss => {
                        let tipos = [];
                        for(var i in rowss) {
                            tipos.push({
                                "saude_id": rowss[i][1],
                                "category": rowss[i][2],
                                "name": rowss[i][3]
                            })
                        }
                        saude.push({
                            "id": rows[row][0],
                            "name": rows[row][1],
                            "day": rows[row][2],
                            "month": (parseInt(rows[row][3]) - 1),
                            "year": rows[row][4],
                            "hours": rows[row][5],
                            "minutes": rows[row][6],
                            "tipos": tipos
                        });
                    })                
                }
                return resolve(saude);
            }, error => {
                console.log("SELECT ERROR", error);
                return reject();
            });
        });       
    }

}
