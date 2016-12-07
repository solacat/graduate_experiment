#include <iostream>

#include "collection.h"

using namespace std;


/*
** divide marginal table by level
*/
map<int, vector<string>> divideMarginTable(string D){
	map<int, vector<string>> marginSets;
	vector<string> marginTables = getSubsetOfMarginTable(D);
	for(int i = 0; i < marginTables.size(); i++){
		string tmp = marginTables[i].c_str();
		marginSets[tmp.length()].push_back(tmp);
	}
	return marginSets;
}


int main(void){
	map<int, vector<string>> marginSets = divideMarginTable("abc");
	for(int i = 1; i<=marginSets.size(); i++){
		cout << i << endl;
		for(int j = 0; j<marginSets[i].size(); j++){
			cout << marginSets[i][j] << endl;
		}
	}
	getchar();
	return 0;
}