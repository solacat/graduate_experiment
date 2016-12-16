"use strict";

const string = "abcdefghijkln";
const collection = require('../../lib/collection.js');
const fs = require('fs');

const marginals = collection.getSubsetOfMarginTable(string);
const marginal_k = collection.getMarginalTable_k(marginals, 7);

fs.writeFileSync('./data/13-7c.json', JSON.stringify(marginal_k));
