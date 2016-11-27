"use strict";

const laplace = require('./Laplace');
const math = require('mathjs');

exports.DP = function(marginTables, n){
    var margin_w = [];
    marginTables.map(margin=>{
        var count = math.pow(2, margin.length);
        var sum = 0;
        for(var i = 0; i < count; i++){
            var _laplace = laplace.getLaplace(n/2);
            sum = sum + _laplace*_laplace;            
        }
        margin_w.push({
            p: margin,
            weight: Math.floor(sum/count)
        })
    })
    return margin_w;
}