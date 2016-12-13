"use strict";

const collection = require('../lib/collection');
const math = require('mathjs');
const _ = require('lodash');
const fs = require('fs');

const conf_map = require('./assoc_arr2.json');
const attr_map = require('../lib/attributes_map.json');

var asc_arr = [];
for(var key in conf_map){
    asc_arr.push({
        asc: key,
        conf: conf_map[key]
    })
}

const string = 'abcdefghij';
const k = 6;
const marginals = collection.getSubsetOfMarginTable(string);
const marginal_k = collection.getMarginalTable_k(marginals, k);

var marginConf_map = {};
var marginConf_Arr = [];

marginal_k.map(margin=>{
    marginConf_map[margin] = 0;
    var _conf = 0;
    var ascArr = [];
    asc_arr.map(asc=>{
        var _attrs = asc.asc.split(',');
        _attrs = `${attr_map[+_attrs[0]]}${attr_map[+_attrs[1]]}`;
        var d_arr = _.difference(_attrs.split(''), margin.split('')); 
        if(d_arr.length == 0){
            console.log(_attrs);
            console.log(margin);
            ascArr.push(_attrs);
            _conf += asc.conf;
            marginConf_map[margin] += asc.conf;
        }
    })
    marginConf_Arr.push({
        margin: margin,
        conf: _conf,
        ascs: ascArr
    })
})

marginConf_Arr = _.sortBy(marginConf_Arr, 'conf');

fs.writeFileSync('./margin10-6_conf.json', JSON.stringify(marginConf_map));
fs.writeFileSync('./margin10-6_conf_arr.json', JSON.stringify(marginConf_Arr));