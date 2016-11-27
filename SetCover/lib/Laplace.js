"use strict";

//Laplace distribution variable
exports.getLaplace = function (lambd) {
    const uniform = Math.random() - 0.5;
    return lambd*Math.sign(uniform)*Math.log(1-2*Math.abs(uniform));
}