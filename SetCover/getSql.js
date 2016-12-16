"use strict";

const sqls = require('./data/sql/10.json');
const fs = require('fs');

const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kosarak'
});

connection.connect();
var res = [];
sqls.map(sql => {
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        console.log(rows[0]['count(*)']);
        res.push(rows[0]['count(*)']);
        fs.appendFileSync('./data/sql/10.txt', `${rows[0]['count(*)']}\n`);
    });
})

connection.end();