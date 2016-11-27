"use strict";

const Binomial = require('./lib/binomial');

/*
**Find the dimentional of marginal table
**input:  coverage, the dimentional of original dataset m
**output: dimentional of marginal table
**/
var getDimentionalOfMarginalTable = function(coverage, m){
	var sum = 0;
	var _cov = 0;
	var dimentional = 1;
	for(var i = 0; i <= m; i++){
		sum = sum + Binomial.Binomial(i, m);
		_cov = sum / (Math.pow(2, m)-1);
		if(_cov > coverage){
			dimentional = i;
			break;
		}
	}
	return dimentional;
}

//console.log(`The dimentional of coverage 0.8 is : ${getDimentionalOfMarginalTable(0.8, 15)}`);
var getTheSizeofMarginalTables = function(){
	return getDimentionalOfMarginalTable(0.8, 26);
}

console.log(getTheSizeofMarginalTables());