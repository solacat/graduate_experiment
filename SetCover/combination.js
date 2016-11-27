"use strict";

const collection = require('./lib/collection');
const fs = require('fs');

const string = 'abcdefghijkln';
var T = collection.getSubsetOfMarginTable(string);
fs.writeFileSync('./data/13.json', JSON.stringify(T));
console.log('done!');