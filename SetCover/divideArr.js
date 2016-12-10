"use strict";

var a = [1,2,3,4,5,6,7,8,9,10];
var k = 3;
var divide = {};
var m = Math.floor(a.length/k);
for(var i = 1; i <= k; i++){
    if(a.length - m  >= m){
        divide[i] = a.splice(0, m);
    }else{
        divide[i] = a;
    }
}
console.log(divide);