import { Injectable } from "@angular/core";
import { Saude } from "../diario-saude/saude.model";
import { Tipo } from "../diario-saude-perguntas/tipo.model";
var Sqlite = require("nativescript-sqlite");

@Injectable({
    providedIn: 'root'
})
export class SqliteService {
    private database: any;

    constructor() {
        (new Sqlite("ps.db")).then(db => {
            this.database = db;
        }, error => {
        });
    }

    insertSaudeDiaria(saude: Saude): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.execSQL("INSERT INTO saude (name, user_id, day, month, year, hours, minutes) VALUES (?, ?, ?, ?, ?, ?, ?)", [saude.name, saude.user_id, saude.day, (parseInt(saude.month) + 1), saude.year, saude.hours, saude.minutes]).then(id => {

                if (saude.tipos.length > 0) {
                    saude.tipos.forEach((value, index) => {
                        this.database.execSQL("INSERT INTO tipos (saude_id, category, name) VALUES (?, ?, ?)", [id, value.category, value.name]).then(id => {

                        }, error => {
                        })
                    })
                }
                resolve();
            }, error => {
                reject();
            });
        })

    }

    public fetchSaudeDiaria(sql?: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let sql_1 = "SELECT * FROM saude WHERE " + sql;

            this.database.all(sql_1).then(rows => {
                let saude = [];

                for (var row in rows) {
                    saude.push({
                        "id": rows[row][0],
                        "name": rows[row][1],
                        "user_id": rows[row][2],
                        "day": rows[row][3],
                        "month": (parseInt(rows[row][4]) - 1),
                        "year": rows[row][5],
                        "hours": rows[row][6],
                        "minutes": rows[row][7],
                        "tipos": []
                    });
                }
                return resolve(saude);
            }, error => {
                return reject();
            });
        });
    }

    public getTipos(saude_id?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let sql_1 = "SELECT * FROM tipos WHERE saude_id = " + saude_id;

            this.database.all(sql_1).then(rowss => {
                let tipos = [];

                for (var i in rowss) {
                    tipos.push({
                        "saude_id": rowss[i][1],
                        "category": rowss[i][2],
                        "name": rowss[i][3]
                    })
                }
                return resolve(tipos);
            }, error => {
                return reject();
            });
        });
    }

}
