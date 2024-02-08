const db = require('./database')

const createItem = (id, title, author, genre, price,callback) =>{
    const sql = `INSERT INTO mock (id, title, author, genre, price) VALUES(?,?,?,?,?)`
    db.run(sql, [id, title, author, genre, price],callback)
}

const updateItem = (id, title, author, genre, price,callback) =>{
    const nam = `SELECT title FROM mock WHERE id = ?`;
    db.get(nam,[id],(err,row)=>{
        if(err){
            return callback(err);
        }
        if(!row){
            return callback(new Error(`book with id: ${id} was not found`))
        }
        const sql = `UPDATE mock  SET title = ?, author = ?,genre = ?, price = ? WHERE id = ?`
    db.run(sql, [title, author, genre, price, id], callback)
    })   
}


module.exports = {createItem,updateItem}