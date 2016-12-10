"use strict";

const _ = require('lodash');

var s1 = 'abcdh';
var s2 = 'aefgi';

function combination(S){
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

var su1 = combination(s1);
var su2 = combination(s2);
var suu = _.union(su1, su2);
var du  = _.xor(suu, su1);
var diff = 
console.log(`different ${du.length}: ${du}`);
