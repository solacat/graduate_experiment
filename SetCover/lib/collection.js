var _ = require('lodash');
var binomial = require('./binomial');

/*
**Collection operation function
**/

//get subset of k-marginal table
var subset = [];
// function combination_s(arr){
//     var substr_arr = [];
//     for(var i = 0; i < arr.length; i++){
//         var m = i + 1;
//         combination(arr, arr.length, m, substr_arr, m);
//     }
// }

// function combination(arr, n, m, substr_arr, subn){
//     if(m == 0){
//         subset.push(substr_arr.toString().replace(/,/g,''));
//     }else{
//         for(var i = n; i>=m; --i){
//             substr_arr[m - 1] = arr[i-1];
//             combination(arr, i-1, m-1, substr_arr, subn);
//         }  
//     }
// }

// exports.getSubsetOfMarginTable = function(KMar){
// 	var collection = KMar.split('');
// 	var size = collection.length;
// 	//push self
//     subset = [];
// 	combination_s(collection);
// 	return subset;
// }

var getSubsetOfMarginTable = function(KMar){
    var S = KMar.split('');
    var n = S.length;
    var comb_arr = [];
    for (var x = 0; x<(1<<n); x++){     // x = 0 .. (2^n -1)
        var aSubset = [];                   // init an empty set
        for (var i=0; i<n; i++){              
            if ( x & (1<<i) )           // if bit i-th is on: 
                aSubset.push(S[i]);
        }
        if(aSubset.length != 0){
            comb_arr.push(aSubset.join().replace(/,/g,''));
        }
    }
    return comb_arr;
}

exports.getSubsetOfMarginTable = function(KMar){
    var S = KMar.split('');
    var n = S.length;
    var comb_arr = [];
    for (var x = 0; x<(1<<n); x++){     // x = 0 .. (2^n -1)
        var aSubset = [];                   // init an empty set
        for (var i=0; i<n; i++){              
            if ( x & (1<<i) )           // if bit i-th is on: 
                aSubset.push(S[i]);
        }
        if(aSubset.length != 0){
            comb_arr.push(aSubset.join().replace(/,/g,''));
        }
    }
    return comb_arr;
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

//different set1
exports.DSet_n = function(u1, u2){
    var i = 0;
    u2.map(item=>{
        if(u1[item] == undefined){
            i++;
        }
    })
    return i;
}


//different set1
exports.DSet = function(u1, u2){
    var _t2 = u2.split('');
    var min = Number.MAX_VALUE;
    const u_s = getSubsetOfMarginTable('abcdef');
    u1.map(item=>{
        var _t1 = item.split('');
        var suu = _.intersection(_t1, _t2);
        var n2 = suu.length;
        var n1 = _t1.length - n2;
        var mv = (Math.pow(2,n1)-1)*Math.pow(n2);
        if(mv < min){
            min = mv;
        }
    })
    return min;
}

//different set1
exports.DSet_pro = function(u1, u2){
    var _t2 = u2.split('');
    var min = Number.MAX_VALUE;
    u1.map(item=>{
        var _t1 = item.split('');
        var suu = _.intersection(_t1, _t2);
        var n2 = suu.length;
        var n1 = _t1.length - n2;
        var mv = (Math.pow(2,n1)-1)*Math.pow(2,n2);
        if(mv < min){
            min = mv;
        }
    })
    return min;
}
//u1{'a':1,'b':2};