"use strict";

const arr = require('./assoc_arr.json');
const _ = require('lodash');
const fs = require('fs');

var attr_map = {};

var attr_set = new Set(arr);
var attr_arr = [];

for(let item of attr_set.keys()){
    attr_arr.push(item.split(','));
}

// for(var i = 0; i < attr_arr.length; i++){
//     for(var j = 0; j < attr_arr.length; j++){
//         var d_arr = _.difference(attr_arr[i], attr_arr[j]);
//         if(i != j && d_arr.length == 0 && attr_arr[j].length > attr_arr[i].length){
//             //console.log(attr_arr[i]);
//             //console.log(attr_arr[j]);
//             attr_arr.splice(i, 1);
//         }
//     }
// }
attr_arr.map(item=>{
    fs.appendFileSync('./attribute.txt', `${item.join()}\n`);
})