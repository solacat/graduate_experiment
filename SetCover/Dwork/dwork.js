"use strict";

const DP = require('../lib/DP');
const fs = require('fs');
const readLine = require('fs-readline');

const rl = readLine('../data/sql/9.txt');
var res_Arr = [];
var n = 10;

rl.on('line', function (line, idx) {
    var res = +line;
    if(idx <= 100){
        res_Arr.push(res);
    }
    if(idx == 100){
        AOCALaplace(res_Arr);
    }
})

function dworkLaplace(res_arr){
    const lambd = Math.pow(2, 13-n);
    const sign = 1;
    const resultDP = DP.Dwork(res_arr, lambd/sign);
    var se = 0;
    for(var i = 0; i<100; i++){
        fs.appendFileSync('10-dp-dwork.txt',`${resultDP[i]}\n`);
        const d = Math.abs(resultDP[i] - res_Arr[i]);
        se += d*d;
    }
    console.log(se/100);
}

function PINQLaplace(res_arr){
    const lambd = 10;
    const sign = 1;
    const resultDP = DP.Dwork(res_arr, lambd/sign);
    var se = 0;
    for(var i = 0; i<100; i++){
        fs.appendFileSync('10-dp-pinq.txt',`${resultDP[i]}\n`);
        const d = Math.abs(resultDP[i] - res_Arr[i]);
        se += d*d;
    }
    console.log(se/100);
}

function AOCALaplace(res_arr){
    const sign = 1;
    const a = (n-2)/(n+1);
    const lambd = a*10;
    const resultDP = DP.Dwork(res_arr, lambd/sign);
    var se = 0;
    for(var i = 0; i<100; i++){
        fs.appendFileSync('8-dp-aoca.txt',`${resultDP[i]}\n`);
        const d = Math.abs(resultDP[i] - res_Arr[i]);
        se += d*d;
    }
    console.log(se/100);
}