"use strict";

/*
**Get factorial of N
**input: N
**output: N!
**/
var factorial = function(N){
	var _f = 1;
	for(var i = 1; i <= N; i++){
		_f = _f * i;
	}
	return _f;
}

/*
**Get Binomial coefficient of (m,n);
**input: m,n
**output: C(n,m) where n<=m;
*/
var Binomial = function(n,m){
	if(n < m/2){
		return factorial(m)/(factorial(n)*factorial(m-n));
	}else{
		return Binomial(m-n, m);
	}
}

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
		sum = sum + Binomial(i, m);
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
	
}