"use strict";

const _ = require('lodash');
const binomial = require('./binomial');

/*
**Collection operation function
**/

//get subset of k-marginal table
var subset = [];
function combination_s(arr){
    var substr_arr = [];
    for(var i = 0; i < arr.length; i++){
        var m = i + 1;
        combination(arr, arr.length, m, substr_arr, m);
    }
}

function combination(arr, n, m, substr_arr, subn){
    if(m == 0){
        subset.push(substr_arr.toString().replace(/,/g,''));
    }else{
        for(var i = n; i>=m; --i){
            substr_arr[m - 1] = arr[i-1];
            combination(arr, i-1, m-1, substr_arr, subn);
        }  
    }
}

exports.getSubsetOfMarginTable = function(KMar){
	var collection = KMar.split('');
	var size = collection.length;
	//push self
    subset = [];
	combination_s(collection);
	return subset;
}
//console.log(getSubsetOfMarginTable('abc'));

//get partial sum of binomial coefficient
exports.getPartialSum = function(n, k){
    var sum = 0;
    for(var i = 1; i<=k;i++){
        sum += binomial.Binomial(i,n);
    }
    return sum;
}

//union
exports.U = function(collections){
    var union = [];
    collections.map(collection=>{
        union = _.union(union, collection);
    })
    return union;
}

//union for string
exports.Us = function(collections){
    var union = [];
    collections.map(collection=>{
        union = _.union(union, collection.split(''));
    })
    return union;
}

//different set
exports.DSet = function(u1, u2){
    var i = 0;
    u2.map(item=>{
        if(u1[item] == undefined){
            i++;
        }
    })
    return i;
}

//u1{'a':1,'b':2};