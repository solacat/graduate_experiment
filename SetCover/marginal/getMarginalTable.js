"use strict";

const collection = require('../lib/collection');
const fs = require('fs');

/*
**generate k marginal table prepare
*/

const string = 'abcde';
var T = collection.getSubsetOfMarginTable(string);
var target = [];
// T.map(item=>{
//     if(item.length == 9)
//         target.push(item);
// })
var marginalTables = {};
T.map(item=>{
    //marginalTables[item] = collection.getSubsetOfMarginTable(item);
    var len = item.length;
    var tmp = collection.getSubsetOfMarginTable(item);
    var tmp_margin = [];
    tmp.map(_item=>{
        if(_item.length == len || _item.length == len -1){
            tmp_margin.push(_item);
        }
    })
    marginalTables[item] = tmp_margin;
})
fs.writeFileSync('./5-5.json', JSON.stringify(marginalTables));
