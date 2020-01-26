

// 以下はzokratesにコンパイルしたときのイメージ
struct gps_format {
    field time
    field longi
    field lati
}

// type:0 -> field
// type:1 -> void
struct variant {
    field type
    filed value
}


def search_place(gps_format[1000] gps_log, gps_format denger_place) -> (variant):
    variant res =  variant {type: 1, variable: 0}
    bool found = false
    for field i in 0..1000 do
        found = if gps_log[i].longi == denger_place.longi && gps_log[i].lati == denger_place.lati then true else found fi
        res = if found then variant {type: 0, variable: i} else res fi
    endfor
    return res

def calc_rick(field denger_place) -> (field):
    field somescore = 10
    return somescore

def main(private gps_format[1000] gps_log) -> (field):
    gps_format denger_place = gps_format {
        time: null,
        longi: 348186736,
        lati: 1355238724
    }

    variant Index = search_place(gps_log, denger_place)
    field safe_score = if Index.type == 0 then 100 - calc_rick(gps_log[Index]) else 100 fi

    return safe_score