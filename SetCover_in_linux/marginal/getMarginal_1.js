"use strict";

const collection = require('../lib/collection');
const fs = require('fs');

/*
**generate k marginal table prepare
*/

const string = 'abcdefghijklnmopq';
var T = collection.getSubsetOfMarginTable(string);
var target = [];
T.map(item=>{
    if(item.length == 10)
        target.push(item);
})
var marginalTables = {};
target.map(item=>{
    marginalTables[item] = collection.getSubsetOfMarginTable(item);
})
fs.writeFileSync('./17-10.json', JSON.stringify(marginalTables));
