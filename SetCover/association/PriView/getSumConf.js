"use strict";

const fs = require('fs');
const conf_arr = require('./data/17-7c_conf_arr.json');

var sumConf = 0;

conf_arr.map(item=>{
    sumConf += item.conf;
})

console.log(`PriView sum of conf: ${sumConf}`);
console.log(`PriView average of conf: ${sumConf/conf_arr.length}`);
console.log(`PriView max of conf: ${conf_arr[conf_arr.length-1].conf}`);