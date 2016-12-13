"use strict";

const _ = require('lodash');
const collection = require('./lib/collection');
const binomial = require('./lib/binomial');
const marginals = require('./marginals/15-9.json');

function getMarginalTable_k(T, k){
    var marginls = [];
    T.map(set=>{
        if(set.length == k){
            marginls.push(set);        
        }
    })
    return marginls;
}

/*The influence of descrease of collection
**In 15 dimension we choose 10-marginal table to cover, get 94.08% coverage
**decreased the size of 10-marginal watch the influence in coverage
**the rule: choose the first element of the rest of subsets
**Input: C(origianl dataset)
         k(dimension of marginal table)
         d(decrease num of size of marginal table)
**Output: coverage
*/
var getDecreaseCoverage = function(K_marginal, d){
	
	console.log(or_Coverage);
}

//use test collection C = (a,b,c,d,e,f) m = |C| = 5
const C = 'abcdefghijklnmo';
const k = 9;
const numOfMarginal = binomial.Binomial(k, C.length);
var Marginals = collection.getSubsetOfMarginTable(C);
var K_marginal = getMarginalTable_k(Marginals, k);
for(var i = 1; i <= numOfMarginal; i++){
	console.log(`decrease num:${i}`);
	getDecreaseCoverage(C,k,i);
}