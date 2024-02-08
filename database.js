const sqlite3 = require('sqlite3').verbose();
const dbName = 'MockDatabase.db';
let db = new sqlite3.Database(dbName,(err) =>{
    if(err){
        console.error(err.message);
    }
    else{
        console.log("Connected to the database");
        db.run('CREATE TABLE IF NOT EXISTS mock(id INTEGER ,title VARCHAR(100),author VARCHAR(100),genre VARCHAR(100),price FLOAT)',(err) =>{
            if(err){
                console.error(err.message);
            }
            else{
                console.log("Table created");
            }
        })
    }
})
module.exports = db


