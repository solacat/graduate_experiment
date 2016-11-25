"use strict";

const _ = require('lodash');
const collection = require('./lib/collection');

/*The influence of descrease of collection
**In 15 dimension we choose 10-marginal table to cover, get 94.08% coverage
**decreased the size of 10-marginal watch the influence in coverage
**Input: m(dataset 	)
         k(dimension of marginal table)
         d(decrease num of size of marginal table)
**Output: coverage
*/
var getDecreaseCoverage = function(C, k, d){
	var OriginalCollection = collection.getSubsetOfMarginTable(C);
	var k_MarginalCollection = _.filter(originalCollection, o=>{
		if(o.length == 3) return o;
	})
	console.log(k_MarginalCollection);
}

//use test collection C = (a,b,c,d,e,f) m = |C| = 5