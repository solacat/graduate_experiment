#include <iostream>
#include <map>
#include <algorithm>  
#include "binomial.h"
#include "DP.h"
#include "collection.h"

using namespace std;

struct setIndex{
	string p;
	int weight;
	int index;
};

map<string, int> set_S;

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
	vector<string> u_s = getSubsetOfMarginTable(s);
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
	for(int i=1; i<=level; i++){
		int len = sets.size();
		for(int j=0; j<len;j++){
			int weight = sets[j].weight;
			if(weight <= B/pow(2.0, (double)i-1) && weight >= B/pow(2.0, (double)i)){
				_Divide[i].push_back(sets[j]);
				sets.erase(sets.begin()+j, sets.begin()+j+1);
				j--;
			}
		}
	}
	_Divide[level+1] = sets;
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

int main(void){
	
	getchar();
	return 0;
}

