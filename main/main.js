import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("data.db");

//db.run("CREATE TABLE user (name VARCHAR, email VARCHAR, password BINARY)");

function insertInto(name, email, password) {

    db.run("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

    db.all("SELECT * FROM user", (error, rows) => {
        if(error) {
            console.log(error);
            return 
        }
        console.log(rows);
    });
}

import read from "readline-sync";

var name = read.question("name: ");
var email = read.question("email :");
var password = read.question("password: ");

insertInto(name, email, password);