

struct gps_format {
    int time;
    int longi;
    int lati;
}


int | void search_place(gps_format gps_log[N], gps_format denger_place) {
    for(int i=0; i<N; i++){
        if(gps_log[i].longi == denger_place.longi && gps_log[i].lati == denger_place.lati) return i;
    }
    return void;
}

int calc_risk(denger_place){
    ~~~~
}

int calc_safe_score(gps_format gps_log[N]){
    int safe_score = 0;
    gps_format denger_place = {
        null,
        348186736,
        1355238724
    }
    int | void Index;
    Index = search_place(gps_log, denger_place);
    // matchを書かないとコンパイルエラー
    match(Index){
        int: safe_score -= calc_risk(gps_log[Index]);
        void: safe_score = 100;
    }

    
    return safe_score;
}


