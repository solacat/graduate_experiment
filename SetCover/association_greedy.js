/*
**Greedy Algorithm
**Author: huzhongnian@gmail.com
**/
"use strict";

const math = require('mathjs');
const fs = require('fs');
const collection = require('./lib/collection');
const binomial = require('./lib/binomial');
const _ = require('lodash');
const DP = require('./lib/DP');

var marginTables = require('./marginal/12-8.json');

var set_S = {};//solution map

/*
**Cheap Max Coverage(CMC)
**From: Size-Constrained Weighted Set Cover
**/

/*
**Get the MBens(s), the elements covered by s and not covered by S
**Input: set with cost
**Ouput: MBen(s)
**/
var MBen = function (s) {

    //console.time('getSubsetOfMarginTable');
    // const collection_S = S.map(marginal=>{
    // 	return collection.getSubsetOfMarginTable(marginal);
    // });
    // const u_s = collection.getSubsetOfMarginTable(s);
    //console.timeEnd('getSubsetOfMarginTable');

    //console.time('marginalTable');
    //const u_s = marginTables[s];
    //console.timeEnd('marginalTable');
    //console.time('Dset');
    const m_Ben = collection.DSet_pro(S, s);
    //console.timeEnd('Dset');
    return m_Ben;
}

/*
**Update MBen
*/
var updateMBen = function (C, S, MBen_s) {
    C.map(item => {
        var _MBen = MBen(item.margin, S);
        if (_MBen != 0) {
            MBen_s[item.margin] = _MBen;
        } else {
            delete MBen_s[item.margin];
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
**Divide the sets into 1+logk level
**Input: sets and level
**Ouput: {'level':[]}
*/
var divideLevel = function (sets, level) {
    var _Divide = {};
    sets = _.sortBy(sets, 'conf');
    var m = Math.floor(sets.length / level);
    for (var i = 1; i <= level; i++) {
        if (sets.length - m >= m) {
            _Divide[i] = sets.splice(0, m);
        } else {
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
    var _Max = MBen_s[divide_set[0].margin];
    var _index = 0;
    var maxSet = [];
    divide_set.map((set, index) => {
        if (MBen_s[set.margin] > _Max) {
            _Max = MBen_s[set.margin];
        }
    });
    for (var i = 0; i < divide_set.length; i++) {
        if (MBen_s[divide_set[i].margin] != _Max) {
            continue;
        } else {
            maxSet.push({
                margin: divide_set[i].margin,
                conf: divide_set[i].conf,
                index: i
            });
        }
    }
    return getMaxConf(maxSet);
}

/*
**get max conf
*/
function getMaxConf(sets) {
    var _sets = _.sortBy(sets, 'conf');
    return _sets[_sets.length - 1];
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

//
function updateSetOfSolution(s) {
    var solutionMap = collection.getSubsetOfMarginTable(s);
    solutionMap.map(item => {
        S_set.add(item);
    })
    return S_set.size;
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
function CMC_greedy(T, C, Cs, n, cov) {
    var Ss = [];
    var MBen_s = getMBen(Cs);
    var level = math.fix(math.log(n, 2));
    const divide_set = divideLevel(C, level);
    const sample_set = SampleSet(level, n);
    //console.log(divide_set);
    //
    for (var i = level; i >= 1; i--) {
        var sample = sample_set[i];
        for (var j = 0; j < sample; j++) {
            if (divide_set[i].length != 0) {
                //console.time("getMaxMBenInDivideSet");
                var q = getMaxMBenInDivideSet(divide_set[i], MBen_s, sample);
                //console.timeEnd("getMaxMBenInDivideSet");
                if (q != false) {
                    //join to solution set
                    S.push(q.margin);
                    Ss.push(q);

                    updateSetOfSolution(q.margin);

                    console.log(`${q.margin}:${q.conf}:${S.length}`);

                    if (q.conf < 0.4) {
                        return S;
                    }

                    //delete from Cs
                    var index_c = Cs.indexOf(q.margin);
                    Cs.splice(index_c, 1);

                    //delete from MBen_s
                    delete MBen_s[q.margin];

                    //delete from divide_set
                    divide_set[i].splice(q.index, 1);

                    //console.log(divide_set[i].length);
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
const string = 'abcdefghij';
const k = 6;
const cov = 0.8;
var n = binomial.Binomial(k, string.length);
var T = collection.getSubsetOfMarginTable(string);
var Cs = getMarginalTable_k(T, k);

//association
const margin_conf = require('./association/margin10-6_conf.json');
const margin_conf_arr = require('./association/margin10-6_conf_arr.json');

var S = [];
var S_set = new Set();

console.time('CMC_greedy_asc time');
const solution = CMC_greedy(T, margin_conf_arr, Cs, n, cov);
console.timeEnd('CMC_greedy_asc time');
console.log('CMC_greedy_asc process memory:' + process.memoryUsage().heapUsed / (1024 * 1024));
console.log('CMC_greedy_asc process memory:' + process.memoryUsage().heapTotal / (1024 * 1024));

const collection_S = solution.map(marginal => {
    return collection.getSubsetOfMarginTable(marginal);
});
const u_S = collection.U(collection_S);
//console.log(`solution marginal tables: ${solution}`);
console.log(`coverage: ${u_S.length / T.length}`);
//fs.writeFileSync('./data/15-9-solution.txt', solution.join());

