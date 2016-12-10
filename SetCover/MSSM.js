"use strict";

const _ = require('lodash');
const fs = require('fs');
const collection = require('./lib/collection');
const margin10_10 = require('./marginal/20-20.json');

const string = 'abcdefghij';
const marginTables = collection.getSubsetOfMarginTable(string);

var MBens = {};
var solution = [];
var solutionMap = {};
var uncoverSets = [];//收集为加入的子集

//divide by level
var margins = {};
marginTables.map(item=>{
    const level = item.length;
    if(!margins[level]){
        margins[level] = [];
        margins[level].push(item);
    }else{
        margins[level].push(item);
    }
});

//MBens
var getMBens = function(s, S){
    //const margins = collection.getSubsetOfMarginTable(s);
    const margins = margin10_10[s];
    return collection.DSet(S, margins);
}

//get MBens Map
var getMBensMap = function(margins){
    var MBensMap = {};
    margins.map(item=>{
        MBensMap[item] = getMBens(item, solution);
    })
}

//update MBens in same level
var updateMBensInSameLevel = function(margins){
    var _max = 0;
    var _index = 0;
    var _p;
    for(var i = 0; i < margins.length; i++){
        var mben = getMBens(margins[i].p, solutionMap);
        margins[i].mben = mben;
        if(mben >= _max){
            _p = margins[i].p;
            _max = mben;
            _index = i;
        }
    }
    return {
        p: _p,
        mben: _max,
        index: _index
    }
}

//get best MBens
var getBestMBens = function(margins, n){
    var marginsB = [];
    margins.map(item=>{
        marginsB.push({
            p: item,
            mben: MBens[item]
        })
    })
    marginsB = _.sortBy(marginsB, 'mben');
    var len = marginsB.length;
    const _max = marginsB[marginsB.length-1].mben;
    var marginsMax = _.filter(marginsB, o=>{
        return o.mben == _max;
    })
    updateAndAddIn(marginsMax);
    // while(1){
    //     if(marginsB[len-1] != undefined && _max == marginsB[len-1].mben){
    //         solution.push(marginsB[len-1].p);
    //         updateSolutionMap(marginsB[len-1].p, solutionMap);
    //         len--;
    //     }else{
    //         break;
    //     }
    // }
}

//when there is more than one element, update the rest of MBens and add
var updateAndAddIn = function(margins){
    var margin = margins[0];
    updateAndAddIn_d(margin, margins);
}

var updateAndAddIn_d = function(margin, margins){
    if(margin.mben == 1 || margins.length == 0){
        uncoverSets = uncoverSets.concat(margins);
        return false;
    }else{
        var targe = margin.p;
        solution.push(targe);
        updateSolutionMap(targe, solutionMap);
        margins.splice(margin.index,1);
        var margin = updateMBensInSameLevel(margins);
        updateAndAddIn_d(margin, margins);
    }
}

//update MBens in next level
var updateMBensInNextLevel = function(margins){
    MBens = {};
    margins.map(item=>{
        MBens[item] = getMBens(item, solutionMap);
    })
}

//get margins for level = 1;
var getMargins1 = function(margins){
    var len = Math.floor(margins.length/2)+1;
    while(len){
        const _s = margins.pop();
        solution.push(_s);
        updateSolutionMap(_s);
        len--;
    }
}

//update solution map
var updateSolutionMap = function(s, S){
    //const margin_s = collection.getSubsetOfMarginTable(s);
    const margin_s = margin10_10[s];
    //console.log(s);
    margin_s.map(item=>{
        if(!solutionMap[item]){
            solutionMap[item] = 1;
        }
    })
}

//solution
const level = string.length;
var k = string.length;
for(var i = 1; i <= level; i++){
    if(i == 1){
        getMargins1(margins[i]);
    }else{
        getBestMBens(margins[i]);
    }
    if(i < level)
        updateMBensInNextLevel(margins[i+1]);
}

/* add uncoverSets
var u1_count = 0;
//proof in add uncoverSets into 
uncoverSets.map(item=>{
    var mben = getMBens(item.p, solutionMap);
    if(mben > 0){
        u1_count++;
        solution.push(item.p);
        updateSolutionMap(item.p, solutionMap);
    }
    //updateSolutionMap(item.p, solutionMap);
})
console.log(u1_count);
*/

//check a cover by b
var coverStringCheck = function(a, b){
    
}

//use level + 2 -> level


var solutionCover = [];
for(var key in solutionMap){
    solutionCover.push(key);
}


var u2_count = 0;
marginTables.map(margin=>{
    if(solutionCover.indexOf(margin) == -1){
        var mben = getMBens(margin, solutionMap);
        if(mben > 0){
            //console.log(`${margin}:${mben}`);
            u2_count++;
            solution.push(margin);
            updateSolutionMap(margin, solutionMap);
        }
    }
})
console.log(u2_count);

var solutionCover = [];
for(var key in solutionMap){
    solutionCover.push(key);
}

const total = Math.pow(2, string.length) - 1;
console.log(solution.length);
console.log(total);
console.log(`coverage: ${solutionCover.length / total}`);