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
exports.Binomial = function(n,m){
	return factorial(m)/(factorial(n)*factorial(m-n));
}