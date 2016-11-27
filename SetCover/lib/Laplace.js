"use strict";

const fs = require('fs');

//Laplace distribution variable
var getLaplace = function (lambd) {
    const uniform = Math.random() - 0.5;
    return lambd*Math.sign(uniform)*Math.log(1-2*Math.abs(uniform));
}

for(var i = 0; i< 100; i++){
    console.log(getLaplace(10));
}