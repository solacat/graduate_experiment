#include<iostream>
#include<string>
#include<vector>
#include<math.h>
#include<map>

#include "binomial.h"

using namespace std;

//get subset of k-marginal table
void combinaton_s(string arr);
void combination(string arr, int n, int m, string substr_arr, int subn);
vector<string> getSubsetOfMarginTable(string KMar);

//get partial sum of binomial coefficient
int getPartialSum(int n, int k);

//union for string
//vector<string> U(vector<string> collections);

//different set
int DSet(map<string, int> u1, vector<string> u2);

//k-marginal table string array
vector<string> subset;

/*
**Collection operation function
**/
void combination(string arr, int n, int m, string substr_arr, int subn){
	if(m == 0){
		subset.push_back(substr_arr);
	}else{
		for(int i = n; i >= m; --i){
			substr_arr[m-1] = arr[i-1];
			combination(arr, i-1, m-1, substr_arr, subn);
		}
	}
}

void combination_s(string arr){
	string substr_arr(arr.size(), '\0');
	for(int i = 0; i < arr.size(); i++){
		int m = i+1;
		combination(arr, arr.size(), m, substr_arr, m);
	}
}

vector<string> getSubsetOfMarginTable(string KMar){
	combination_s(KMar);
	return subset;
}

//get partial sum of binomial coefficient
int getPartialSum(int n, int k){
	int sum = 0;
	for(int i = 1;i <= k; i++){
		sum += binomial(i, n);
	}
	return sum;
}

//different set
int DSet(map<string, int>u1, vector<string> u2){
	int d = 0;
	for(int i = 0; i < u2.size(); i++){
		if(u1.find(u2[i]) == u1.end()){
			d++;
		}
	}
	return d;
}