/*
**Greedy Algorithm
**Author: huzhongnian@gmail.com
**/

"use strict";

const math = require('mathjs');
const fs = require('fs');
const collection = require('./lib/collection');
const _ = require('lodash');
const DP = require('./lib/DP');

var set_S = {};
var solution_S = {};

/*
**Cheap Max Coverage(CMC)
**From: Size-Constrained Weighted Set Cover
**/

/*
**Get the cost of the k cheapest sets
**Input: sets with cost
**Output: the cheapest cost
**/
var findCheapCost = function (sets, k) {
    var cost = 0;
    var sets = _.sortBy(sets, 'weight');
    sets.map((item, index) => {
        if (index < k) {
            cost = cost + item.weight;
        }
    })
    return cost;
}

/*
**Form set
*/
var updateSets = function (s) {
    var sets = collection.getSubsetOfMarginTable(s);;
    sets.map(item => {
        if (set_S[item] == undefined) {
            set_S[item] = 1;
        }
    })
}

/*
**Get the MBens(s), the elements covered by s and not covered by S
**Input: set with cost
**Ouput: MBen(s)
**/
var MBen = function (s, solution) {

    //console.time('getSubsetOfMarginTable');
    // const collection_S = S.map(marginal=>{
    // 	return collection.getSubsetOfMarginTable(marginal);
    // });
    // const u_s = collection.getSubsetOfMarginTable(s);
    //console.timeEnd('getSubsetOfMarginTable');

    //console.time('marginalTable');
    //console.timeEnd('marginalTable');

    //console.time('Dset');
    const m_Ben = collection.DSet(S, s);
    //console.timeEnd('Dset');
    return m_Ben;
}

/*
**Update MBen
*/
var updateMBen = function (C, MBen_s, solution) {
    C.map(item => {
        var _MBen = MBen(item.p, solution);
        if (_MBen != 0) {
            MBen_s[item.p] = _MBen;
        } else {
            delete MBen_s[item.p];
        }
    })
}

/*
**Get MBens
*/
var getMBen = function (C) {
    var MBens = {};
    C.map(item => {
        MBens[item] = math.pow(2, item.length) - 1;
    })
    return MBens;
}

/*
**Get all possible sets cost
**Input: all possible sets with cost
**Ouput: the sum of cost
**/
var getSumCost = function (sets) {
    var sum_cost = 0;
    sets.map(item => {
        sum_cost = sum_cost + item.weight;
    });
    return sum_cost;
}

/*
**Divide the sets into 1+logk level
**Input: sets and level
**Ouput: {'level':[]}
*/
var divideLevel = function (sets, level) {
    var _Divide = {};
    sets = _.sortBy(sets, 'weight');
    var m = Math.floor(sets.length/level);
    for (var i = 1; i <= level; i++) {
        if(sets.length - m  >= m){
            _Divide[i] = sets.splice(0, m);
        }else{
            _Divide[i] = sets;
        }
    }
    return _Divide;
}

/*
**Sample sets
**Input: level
**Ouput: Sample set
*/
var SampleSet = function (level, k) {
    var sample_set = [];
    for (var i = 1; i <= level; i++) {
        sample_set[i] = math.pow(2, i);
    }
    sample_set[level + 1] = k;
    return sample_set;
}

/*
**get max MBen in array
**Input: divide_set, MBen 
**Ouput：Max MBen in divide_set
*/
var getMaxMBenInDivideSet = function (divide_set, MBen_s, sample) {
    var _Max = MBen_s[divide_set[0].p];
    var _index = 0;
    var maxSet = [];
    divide_set.map((set, index) => {
        if (MBen_s[set.p] > _Max) {
            _Max = MBen_s[set.p];
        }
    });
    for (var i = 0; i < divide_set.length; i++) {
        if (MBen_s[divide_set[i].p] != _Max) {
            continue;
        } else {
            maxSet.push({
                p: divide_set[i].p,
                weight: divide_set[i].weight,
                index: i
            });
        }
    }
    return getMinWeight(maxSet);
}

/*
**get min weight
*/
function getMinWeight(sets) {
    var _sets = _.sortBy(sets, 'weight');
    return _sets[0];
}

/*
**get cheapest k
**find the k sets to cover the all attribute
**return k
**/
function getCheapest_k(C, T, cov) {
    var union = collection.U(C[0], C[1]);
    if (union.length == T.length) {
        return 2;
    } else {
        for (var i = 2; i < C.length; i++) {
            union = collection.U(C[i], union.toString().replace(/,/g, ''));
            if (union.length == T.length)
                return i;
        }
    }
}

/*
**get k-marginal table
*/
function getMarginalTable_k(T, k) {
    var marginls = [];
    T.map(set => {
        if (set.length == k) {
            marginls.push(set);
        }
    })
    return marginls;
}


/*
**Main： get solution sets
**Input: T(collection of elements)
         C(set collection of T with weight)
         Cs(original set collection of T)
         k(maximum solution size)
         cov(fraction representing desired coverage)
         b(the cost budget increase)
  Output: The B with the min cost
**
*/
function CMC(T, C, Cs, n, cov) {
    S = []; //solution set
    var Ss = [];
    var MBen_s = getMBen(Cs);
    const level = math.fix(math.log(n, 2));
    const divide_set = divideLevel(C, level);
    const sample_set = SampleSet(level, n);
    //console.log(divide_set);
    //
    for (var i = 1; i <= level; i++) {
        var sample = sample_set[i];
        for (var j = 0; j < sample; j++) {
            if (divide_set[i].length != 0) {
                //console.time("getMaxMBenInDivideSet");
                var q = getMaxMBenInDivideSet(divide_set[i], MBen_s, sample);
                //console.timeEnd("getMaxMBenInDivideSet");
                if (q != false) {
                    //join to solution set
                    S.push(q.p);
                    Ss.push(q);
                    console.log(`${q.p}:${S.length}`);
                    
                    solution_S[q.p] = 1;
                    updateSets(q.p)

                    if (S.length >= n) {
                        return S;
                    }

                    //delete from Cs
                    var index_c = Cs.indexOf(q.p);
                    Cs.splice(index_c, 1);

                    //delete from MBen_s
                    delete MBen_s[q.p];

                    //delete from divide_set
                    divide_set[i].splice(q.index, 1);

                    //console.time("updateMBen");
                    updateMBen(divide_set[i], S, MBen_s);
                    //console.timeEnd("updateMBen");
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    return S;
}

//test for CMC
const string = 'abcdefghijklnmopq';
const k = 11;
var n = 258;
var S = [];
var T = collection.getSubsetOfMarginTable(string);
var Cs = getMarginalTable_k(T, k);
var C = DP.DP(Cs, n);
console.time('CMC time');
const solution = CMC(T, C, Cs, n, 0.8);
console.timeEnd('CMC time');
console.log('CMC process used memory:' + process.memoryUsage().heapUsed/(1024*1024));
console.log('CMC process total memory:' + process.memoryUsage().heapTotal/(1024*1024));
const collection_S = solution.map(marginal => {
    return collection.getSubsetOfMarginTable(marginal);
});
const u_S = collection.U(collection_S);
//console.log(`solution marginal tables: ${solution}`);
console.log(`coverage: ${u_S.length / T.length}`);

