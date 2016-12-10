var fs = require('fs');

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

var getSubsetOfMarginTable = function(KMar){
	var collection = KMar.split('');
	var size = collection.length;
	//push self
    subset = [];
	combination_s(collection);
	return subset;
}

/*
**generate k marginal table prepare
*/

var string = 'abcdefghijklnmopqrstu';
var T = getSubsetOfMarginTable(string);
var target = [];

var marginalTables = {};
T.map(function(item){
    //marginalTables[item] = getSubsetOfMarginTable(item);
    var len = item.length;
    var tmp = getSubsetOfMarginTable(item);
    var tmp_margin = [];
    tmp.map(function(_item){
        if(_item.length == len || _item.length == len -1){
            tmp_margin.push(_item);
        }
    })
    marginalTables[item] = tmp_margin;
})
fs.writeFileSync('./5-5.json', JSON.stringify(marginalTables));
