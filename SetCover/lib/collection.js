"use strict";

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
	combination_s(collection);
	return subset;
}
//console.log(getSubsetOfMarginTable('abc'));