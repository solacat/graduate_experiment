/*
**Greedy Algorithm
**Author: huzhongnian@gmail.com
**/

"use strict";

/*
**Cheap Max Coverage(CMC)
**From: Size-Constrained Weighted Set Cover
**/

/*
**Get the cost of the k cheapest sets
**Input: sets with cost
**Output: the cheapest cost
**/
var findCheapCost = function(sets){

}

/*
**Get the MBens(s)
**Input: set with cost
**Ouput: MBen(s)
**/
var MBen = function(s){

}

/*
**Get all possible sets cost
**Input: all possible sets with cost
**Ouput: the sum of cost
**/
var getSumCost = function(sets){

}

/*
**Main： get solution sets
**Input: T(collection of elements)
         C(set collection of T)
         k(maximum solution size)
         cov(fraction representing desired coverage)
         b(the cost budget increase)
  Output: The B with the min cost
**
*/
var CMC = function(T, C, k, cov, b){
	var B = findCheapCost(C);
    const maxCost = getSumCost(C);
    var S = []; //empty set
	while(B < maxCost){
        
	}
}
