"use strict";

const collection = require('./lib/collection');
const fs = require('fs');
const kosarak_atr = require('./lib/attributes_map_kosarak.json');

const string = 'abcdefghijklnmopqrstvu';
var T = collection.getSubsetOfMarginTable(string);

function getMarginalTable_k(T, k) {
    var marginls = [];
    T.map(set => {
        if (set.length == k) {
            marginls.push(set);
        }
    })
    return marginls;
}

var marginls_5 = getMarginalTable_k(T, 10);
var marginls_5_100 = marginls_5.splice(5731,100);

var sql_Arr = [];

marginls_5_100.map(item=>{
    var atr_arr = item.split('');
    var sql = "SELECT count(*) FROM kosarak WHERE";
    atr_arr.map((atr, index)=>{
        var random = Math.round(Math.random());
        if(index != 9){
            sql += " `"+ kosarak_atr[atr] +"` = "+ random +" AND";
        }else{
            sql += " `"+ kosarak_atr[atr] +"` = "+ random +";";
        }
    })
    sql_Arr.push(sql);
    sql  = sql + '\n';
    console.log(sql);
    fs.appendFileSync('./data/sql/10.sql', sql);
})

fs.writeFileSync('./data/sql/10.json',JSON.stringify(sql_Arr));