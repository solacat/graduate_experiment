#include<iostream>
#include<string>
#include<vector>
#include<math.h>
#include<map>

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
