#include <math.h>
#include <time.h>
#include <iostream>
#include "DP.h";

using namespace std;

//math.sign function
int _sign(double x){
	return (x > 0) ? 1 : ((x < 0) ? -1 : 0);
}

//get laplace noise
double getLaplace(double lambd){
	double uniform = ((double) rand() / (RAND_MAX)) - 0.5;
	return lambd * _sign(uniform) * log(1 - 2.0 * abs(uniform));
}

//add lapalce noise to keep differential privacy
vector<marginW> DP(vector<string> marginTables, double n){
	vector<marginW> margin_w;
	for(int i = 0;i<marginTables.size();i++){
		int l = marginTables[i].length();
		int count = (int)pow(2.0, double(l));
		double sum;
		marginW _margin;
		for(int j = 0;j < count;j++){
			double _laplace = getLaplace(n);
			sum+=_laplace;
		}
		_margin.p = marginTables[i];
		_margin.weight = sum;
		margin_w.push_back(_margin);
	}
	return margin_w;
}