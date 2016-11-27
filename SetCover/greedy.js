/*
**Greedy Algorithm
**Author: huzhongnian@gmail.com
**/

"use strict";

const math = require('mathjs');
const collection = require('./lib/collection');
const _ = require('lodash');

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
**Get the MBens(s), the elements covered by s and not covered by S
**Input: set with cost
**Ouput: MBen(s)
**/
var MBen = function (s, S) {
    const u_S = collection.Us(S);
    const m_Ben = collection.DSet(u_S, s.split(''));
    return m_Ben.length;
}

/*
**Update MBen
*/
var updateMBen = function (C, S, MBen_s) {
    C.map(item => {
        var _MBen = MBen(item, S);
        if (_MBen != 0) {
            MBen_s[item] = MBen(item, S);
        } else {
            delete MBen_s[item];
        }
    })
}

/*
**Get MBens
*/
var getMBen = function (C) {
    var MBens = {};
    C.map(item => {
        MBens[item] = item.length;
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
var divideLevel = function (sets, level, B) {
    var _Divide = {};
    for (var i = 1; i <= level; i++) {
        _Divide[i] = [];
        const len = sets.length;
        for (var j = 0; j <= len - 1; j++) {
            if (sets[j] != undefined) {
                if (sets[j].weight <= B / math.pow(2, i - 1) && sets[j].weight >= B / math.pow(2, i)) {
                    _Divide[i].push(sets[j]);
                    sets.splice(j, 1);
                    j--;
                }
            }
        }
    }
    _Divide[level + 1] = sets;
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
    var _Max = 0;
    var _index = 0;
    var flag = 0;
    divide_set.map((set, index) => {
        if(MBen_s[set.p]){
            if (MBen_s[set.p] > _Max) {
                _Max = MBen_s[set.p];
                _index = index;
            }
        }else{
            flag++;
        }
    })
    if (flag != divide_set.length) {
        return {
            p: divide_set[_index].p,
            weight: divide_set[_index].weight,
            index: _index
        };
    } else {
        return false;
    }
}

/*update divide set*/
// var updateDivideSet = function (divide_set, MBen_s) {
//     var len = divide_set.length;
//     var _divide_set = [];
//     for (var i = 0; i < len; i++) {
//         if (MBen_s[divide_set[i].p]) {
//             _divide_set.push(divide_set[i])
//         }
//     }
//     return _divide_set;
// }

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
function CMC(T, C, Cs, k, cov, B, b) {
    const maxCost = getSumCost(C);
    var S = []; //solution set
    var Ss = [];
    var MBen_s = getMBen(Cs);
    var rem = (1 - (1 / math.e)) * cov * T.length;
    const level = math.ceil(math.log(k, 2));
    const divide_set = divideLevel(C, level, B);
    const sample_set = SampleSet(level, k);
    //
    for (var i = 1; i <= level + 1; i++) {
        var sample = sample_set[i];
        for (var j = 0; j < sample; j++) {
            var q = getMaxMBenInDivideSet(divide_set[i], MBen_s, sample);
            if (q != false) {
                S.push(q.p);
                Ss.push(q);
                var index_c = Cs.indexOf(q.p);
                Cs.splice(index_c, 1);
                //rem = rem - MBen_s[q.p];
                delete MBen_s[q.p];
                if (rem <= 0) {
                    return S;
                }
                updateMBen(Cs, S, MBen_s);
            } else {
                break;                   
            }
            //console.log(MBen_s);
        }
    }
    return S;

    // if (rem <= 0) {
    //     B = B * (1 + b);
    //     CMC(T, C, k, cov, B, b)
    // }
}

//test for CMC
const string = 'abcdef';
const Ts = collection.getSubsetOfMarginTable(Ts);
var C = Ts.map(item => {
    return {
        p: item,
        weight: max
    }
});
const k = 5;
const B = findCheapCost(C, k);
console.log(CMC(T, C, Cs, 5, 0.8, B, 1));


//test for divide function
// const sets = [2, 4, 1, 10, 23, 13, 9, 10];
// const k = 8;
// const B = 33;
// divideLevel(sets, k, B);
//var B = findCheapCost(C);

//test for MBen function
// const s = [1,2,3];
// const S = [[1,2],[4,5]];
// console.log(MBen(s,S));

//test for findCheapCost function
// var sets = [
//     {p: 'a', weight:3},
//     {p: 'b', weight:1},
//     {p: 'c', weight:5},
//     {p: 'd', weight:2}
// ];
// const k = 2;
// console.log(findCheapCost(sets, k));

//test for getSumCost function
//console.log(getSumCost(C))

//test for updateMBen
// const S = ['abde', 'a'];
// var MBen_s = getMBen(Cs);
// S.map(item=>{
//     var index = Cs.indexOf(item);
//     Cs.splice(index, 1);
// })
// updateMBen(Cs, S, MBen_s);
// console.log(MBen_s);


