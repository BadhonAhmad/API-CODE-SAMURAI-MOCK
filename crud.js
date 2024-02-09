const { query } = require('express');
const db = require('./database');

const createItem = (id, title, author, genre, price, callback) => {
    const sql = `INSERT INTO mock (id, title, author, genre, price) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [id, title, author, genre, price], callback);
};

const updateItem = (id, title, author, genre, price, callback) => {
    const selectQuery = `SELECT title FROM mock WHERE id = ?`;
    const updateQuery = `UPDATE mock SET title = ?, author = ?, genre = ?, price = ? WHERE id = ?`;

    db.get(selectQuery, [id], (err, row) => {
        if (err) {
            return callback(err);
        }
        if (!row) {
            return callback(new Error(`Book with id: ${id} was not found`));
        }

        db.run(updateQuery, [title, author, genre, price, id], callback);
    });
};

const getSingleItem = (id, callback) => {
    const sql = `SELECT * FROM mock WHERE id = ?`;
    db.get(sql, [id], callback);
};

const getAllBooks = (callback) => {
    const sql = `SELECT * FROM mock`;
    db.all(sql, [], callback);
};


const searchBook = (queryPar, callback) => {
    let query = `SELECT * FROM mock`;

    if (queryPar.title) {
        query += ` WHERE title = '${queryPar.title}'`;
    } else if (queryPar.author) {
        query += ` WHERE author = '${queryPar.author}'`;
    } else if (queryPar.genre) {
        query += ` WHERE genre = '${queryPar.genre}'`;
    }

    if (queryPar.sort) {
        query += ` ORDER BY ${queryPar.sort}`;
    } else {
        query += ` ORDER BY id`;
    }

    if (queryPar.order) {
        query += ` ${queryPar.order}`;
    } else {
        query += ` ASC`;
    }

    db.all(query, callback);
};

// const deleteBook = (id, callback) => {
//     const sql = 'DELETE FROM mock WHERE id = ?';
//     db.run(sql, [id], callback);
// };

module.exports = { createItem, updateItem, getSingleItem, getAllBooks, searchBook };
