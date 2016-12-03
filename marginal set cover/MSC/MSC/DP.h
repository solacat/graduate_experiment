#include<iostream>
#include<string>
#include<vector>

using namespace std;

//datastruct for element of marginal table
struct marginW{
	string p;
	double weight;
};

//sign function
int _sign(double x);

//get laplace noise
double getLaplace(double lambd);

//add lapalce noise to keep differential privacy
vector<marginW> DP(vector<string> marginTables, int n);