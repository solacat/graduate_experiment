"use strict";

const collection = require('../lib/collection');
const fs = require('fs');

/*
**generate k marginal table prepare
*/

const string = 'abcdefghijkl';
var T = collection.getSubsetOfMarginTable(string);
var target = [];
T.map(item=>{
    if(item.length == 8)
        target.push(item);
})
var marginalTables = {};
target.map(item=>{
    marginalTables[item] = collection.getSubsetOfMarginTable(item);
})
fs.writeFileSync('./12-8.json', JSON.stringify(marginalTables));
