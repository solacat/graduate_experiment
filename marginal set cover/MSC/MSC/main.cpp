#include <iostream>
#include <fstream>
#include <map>
#include <algorithm>
#include <math.h>
#include <time.h>
#include "binomial.h"
#include "collection.h"

using namespace std;

struct setIndex{
	string p;
	int weight;
	int index;
};

//datastruct for element of marginal table
struct marginW{
	string p;
	double weight;
};

map<string, int> set_S;

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
vector<marginW> DP(vector<string> marginTables, int n){
	double _n = (double) n;
	vector<marginW> margin_w;
	for(int i = 0;i<marginTables.size();i++){
		int l = marginTables[i].length();
		int count = (int)pow(2.0, double(l));
		double sum = 0;
		marginW _margin;
		for(int j = 0;j < count;j++){
			double _laplace = getLaplace(_n);
			sum+=_laplace;
		}
		_margin.p = marginTables[i];
		_margin.weight = sum;
		margin_w.push_back(_margin);
	}
	return margin_w;
}

/*
**sort by weight d
*/
bool sortByWeight_d(marginW s1, marginW s2){
	return s1.weight > s2.weight;
}

/*
**Get the cost of the k cheapest sets
**Input: sets with cost
**Output: the cheapest cost
**/
int findCheapCost(vector<marginW> sets, int k){
	int cost = 0;
	std::sort(sets.begin(), sets.end(), sortByWeight_d);
	for(int i=0; i < sets.size(); i++){
		if(i < k){
			cost = cost + sets[i].weight;
		}
	}
	return cost;
}

/*
**Form set
*/
void updateSets(string s){
	vector<string> marginTables = getSubsetOfMarginTable(s);
	for(int i = 0 ;i<marginTables.size(); i++){
		if(set_S.find(marginTables[i]) == set_S.end()){
			set_S[marginTables[i]] = 1;
		}
	}
}

/*
**Get the MBens(s), the elements covered by s and not covered by S
**Input: set with cost
**Ouput: MBen(s).length
**/
int MBen(string s){
	vector<string> u_s;
	string _s = s.c_str();
	u_s = getSubsetOfMarginTable(_s);
	return DSet(set_S, u_s);
}

/*
**Update MBen
*/
void updateMBen(vector<string> C, map<string, int>MBen_s){
	for(int i = 0; i<C.size();i++){
		int _MBen = MBen(C[i]);
		if(_MBen != 0){
			MBen_s[C[i]] = _MBen;
		}else{
			map<string, int>::iterator l_it;
			l_it = MBen_s.find(C[i]);
			MBen_s.erase(l_it);
		}
	}
}

/*
**Get MBens
*/
map<string, int> getMBen(vector<string> C){
	map<string, int> MBens;
	for(int i=0; i<C.size(); i++){
		int len = C[i].length();
		MBens[C[i]] = (int) pow(2.0, (double)len)-1;
	}
	return MBens;
}

/*
**Get all possible sets cost
**Input: all possible sets with cost
**Ouput: the sum of cost
**/
int getSumCost(vector<marginW> sets){
	int sum_w = 0;
	for(int i = 0; i<sets.size();i++){
		sum_w+=sets[i].weight;
	}
	return sum_w;
}

/*
**Divide the sets into 1+logk level
**Input: sets and level
**Ouput: {'level':[]}
*/
map<int, vector<marginW>> divideLevel(vector<marginW> sets, int level, int B){
	map<int, vector<marginW>> _Divide;
	vector<marginW> _res;
	for(int i=1; i<=level; i++){
		int len = sets.size();
		for(int j=0; j<len;j++){
			double weight = abs(sets[j].weight);
			if(weight <= B/pow(2.0, (double)i-1) && weight >= B/pow(2.0, (double)i)){
				_Divide[i].push_back(sets[j]);
			}else{
				_res.push_back(sets[j]);
			}
		}
	}
	_Divide[level+1] = _res;
	return _Divide;
}

/*
**Sample sets
**Input: level
**Ouput: Sample set
*/
vector<int> SampleSet(int level, int k){
	vector<int> sample_set;
	for(int i=1; i<=level; i++){
		sample_set.push_back((int)pow(2.0, (double)i));
	}
	sample_set.push_back(k);
	return sample_set;
}

/*
**sort by weight
*/
bool sortByWeight(setIndex s1, setIndex s2){
	return s1.weight < s2.weight;
}

/*
**get min weight
*/
setIndex getMinWeight(vector<setIndex> sets){
	std::sort(sets.begin(), sets.end(), sortByWeight);
	return sets[0];
}

/*
**get max MBen in array
**Input: divide_set, MBen 
**Ouput£ºMax MBen in divide_set
*/
setIndex getMaxMBenInDivideSet(vector<marginW> divide_set, map<string, int> MBen_s){
	int _max = MBen_s[divide_set[0].p];
	int _index = 0;
	vector<setIndex> maxSet;
	for(int i=0;i<divide_set.size();i++){
		if(MBen_s[divide_set[i].p] > _max){
			_max = MBen_s[divide_set[i].p];
		}
	}
	for(int j = 0; j<divide_set.size();j++){
		if(MBen_s[divide_set[j].p] != _max){
			continue;
		}else{
			setIndex _maxset;
			_maxset.p = divide_set[j].p;
			_maxset.weight = divide_set[j].weight;
			_maxset.index = j;
			maxSet.push_back(_maxset);
		}
	}
	return getMinWeight(maxSet);
}

/*
**get k-marginal table
*/
vector<string> getMarginalTable_k(vector<string> T, int k){
	vector<string> marginals;
	for(int i = 0; i < T.size(); i++){
		string _c = T[i].c_str();
		if(_c.size() == k){
			marginals.push_back(T[i]);
		}
	}
	return marginals;
}

/*
**indexOf
*/
void indexOf(string val, vector<string> &arr){
	for(int i = 0; i < arr.size(); i++){
		if(arr[i] == val){
			arr.erase(arr.begin()+i);
			break;
		}
	}
}

/*
** new greedy CMC
*/
vector<string> CMC_greedy(vector<marginW> C, vector<string> Cs,int B, int n, double cov){
	int maxCost = getSumCost(C);
	vector<string> S;
	map<string, int> MBen_s = getMBen(Cs);
	int level = (int)(log((double)n)/log(2.0));
	map<int, vector<marginW>> divide_set = divideLevel(C, level, B);
	vector<int> sample_set = SampleSet(level, n);

	for(int i = level; i>=0; i--){
		int sample = sample_set[i];
		for(int j = 0; j < sample; j++){
			if(divide_set[i+1].size() != 0){
				setIndex q = getMaxMBenInDivideSet(divide_set[i+1], MBen_s);
				cout << q.p << endl;
				S.push_back(q.p);
				updateSets(q.p);
				if(S.size() >= n){
					return S;
				}
				indexOf(q.p, Cs);
				map<string, int>::iterator l_it;
				l_it = MBen_s.find(q.p);
				MBen_s.erase(l_it);
				divide_set[i+1].erase(divide_set[i+1].begin()+q.index);
				updateMBen(Cs, MBen_s);
			}else{
				break;
			}
		}
	}
	return S;
}

int main(void){
	string s = "abcdefghij";
	int k = 7;
	int n = 34;
	//getMarginalFromJson();
	vector<string> T = getSubsetOfMarginTable(s);
	vector<string> Cs = getMarginalTable_k(T,k);
	vector<marginW> C = DP(Cs, n);
	int B = findCheapCost(C,n);
	vector<string> solution = CMC_greedy(C, Cs, B, n, 0.8);
	for(int i = 0; i < solution.size(); i++){
		cout << solution[i] << endl;
	}
	vector<string> solution_s;
	map<string, int>::iterator iter;
	for(iter = set_S.begin(); iter != set_S.end(); iter++){
		solution_s.push_back(iter->first);
	}
	double cov = (double)solution_s.size() / (double) T.size();
	cout << "The coverage is: " << cov << endl;
	getchar();
	return 0;
}

