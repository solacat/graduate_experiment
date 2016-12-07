#include<iostream>

using namespace std;

//get factorial of N
int factorial(int N);

//get binomial coefficient of (m,n);
int binomial(int n, int m);

/*
**Get factorial of N
**input: N
**output: N!
**/
int factorial(int N){
	int _f = 1;
	for(int i = 1; i<=N; i++){
		_f=_f*i;
	}
	return _f;
}

/*
**Get Binomial coefficient of (m,n);
**input: m,n
**output: C(n,m) where n<=m;
*/
int binomial(int n, int m){
	return factorial(m)/(factorial(n)*factorial(m-n));
}