"use strict";

const fs = require('fs');

const string = "abcdefghijklnmopqrstuv";
const atr_arr = [6,3,11,1,218,7,4,27,148,55,64,77,2,138,294,83,316,40,136,446,490];
const str_Arr = string.split('');

var str_map = {};
str_Arr.map((item, index)=>{
    str_map[item] = atr_arr[index];
})
fs.writeFileSync('./attributes_map_kosarak.json', JSON.stringify(str_map));
