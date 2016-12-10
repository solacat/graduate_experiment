"use strict";

const collection = require('./lib/collection');
const fs = require('fs');

const string = 'abcdefghijklnmopqrstuwvxyz';
var T = collection.getSubsetOfMarginTable(string);
fs.writeFileSync('./data/17.json', JSON.stringify(T));
console.log('done!');