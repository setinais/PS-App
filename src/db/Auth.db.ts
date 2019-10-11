var Sqlite = require("nativescript-sqlite");

export class AuthDb {
    private database: any;
    public people: Array<any>;

    public constructor() {
        this.people = [];
        (new Sqlite("db-ps.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM people").then(rows => {
            this.people = [];
            for(var row in rows) {
                this.people.push({
                    "firstname": rows[row][1],
                    "lastname": rows[row][2]
                });
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
}
