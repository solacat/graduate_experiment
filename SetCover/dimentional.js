"use strict";

const factorial = require('factorial');
const fs = require('fs');


//Choose n elements from m
var C = function(m, n) {
    return factorial(m) / (factorial(n) * factorial(m - n));
}

var collection = function() {
    for (var i = 1; i <= 26; i++) {
        //console.log(`Dimension: ${i}`);
        //fs.appendFileSync('./dimension.txt', `Dimension: ${i}\n`);
        var sum = 0;
        for (var j = 1; j <= i; j++) {
            var num = C(i, j);
            //var cov = num / (Math.pow(2, i)-1);
            sum = sum + num;
            var cov = sum / (Math.pow(2, i) - 1)
                //console.log(`${j}-Marginal: ${num}, coverage: ${cov*100}%`);
                //fs.appendFileSync('./dimension.txt', `${j}-Marginal: ${num}, coverage: ${cov*100}%\n`);
            fs.appendFileSync('./dimension-num.txt', `${j}\n`);
            fs.appendFileSync('./dimension-cov.txt', `${cov*100}%\n`);
        }
        fs.appendFileSync('./dimension-num.txt', '\n');
        fs.appendFileSync('./dimension-cov.txt', '\n');
    }
    console.log('done');
}
