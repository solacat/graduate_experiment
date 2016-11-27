"use strict";

const _ = require('lodash');
const collection = require('./lib/collection');
const binomial = require('./lib/binomial');

/*The influence of descrease of collection
**In 15 dimension we choose 10-marginal table to cover, get 94.08% coverage
**decreased the size of 10-marginal watch the influence in coverage
**the rule: choose the first element of the rest of subsets
**Input: C(origianl dataset)
         k(dimension of marginal table)
         d(decrease num of size of marginal table)
**Output: coverage
*/
var getDecreaseCoverage = function(C, k, d){
	var OriginalCollection = collection.getSubsetOfMarginTable(C);
	OriginalCollection.sort();
	var k_MarginalCollection = _.filter(OriginalCollection, o=>{
		if(o.length == k) return o;
	});
	var sets_MarginalCollection = k_MarginalCollection.map(marginal=>{
		return collection.getSubsetOfMarginTable(marginal);
	});
	const origianSize = collection.U(sets_MarginalCollection).length;
	var dec_MarginalCollection = [];

	var len = sets_MarginalCollection.length;
	for(var i = 1; i <= len; i++){
		if(i <= d){
			var item = sets_MarginalCollection.shift();
			dec_MarginalCollection.push(item);
		}
	}

	const u1 = collection.U(sets_MarginalCollection);
	const u2 = collection.U(dec_MarginalCollection);
	const or_Coverage = (origianSize - collection.DSet(u1, u2).length) / (Math.pow(2, C.length)-1);
	console.log(or_Coverage);
}

//use test collection C = (a,b,c,d,e,f) m = |C| = 5
const C = 'abcdefghij';
const k = 7;
const numOfMarginal = binomial.Binomial(k, C.length);
for(var i = 1; i <= numOfMarginal; i++){
	console.log(`decrease num:${i}`);
	getDecreaseCoverage(C,k,i);
}