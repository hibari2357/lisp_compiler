



int | void search_place(int gps_longi[1000], int gps_lati[1000], int denger_place_longi, int denger_place_lati) {
    for(int i=0; i<N; i++){
        if(gps_longi[i] == denger_place_longi && gps_lati[i] == denger_place_lati) return i;
    }
    return void;
}

int calc_risk(int gps_longi, int gps_lati){
    ~~~~
}

int calc_safe_score(int gps_longi[1000], int gps_lati[1000]){
    int safe_score = 0;

    int denger_place_longi = 348186736;
    int denger_place_lati = 1355238724;

    // variant type
    int | void index;
    Index = search_place(gps_longi, gps_time, denger_place_longi, denger_place_lati);
    // matchを書かないとコンパイルエラー
    match(index){
        int: safe_score -= calc_risk(gps_longi[index], gps_lati[index]);
        void: safe_score = 100;
    }

    
    return safe_score;
}


