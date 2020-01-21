
// type:0 -> field
// type:1 -> void
struct variant {
    field type
    field value
}


def search_place(private field[2] gps_longi, private field[2] gps_lati, field denger_place_longi, field denger_place_lati) -> (variant):
    variant res =  variant {type: 1, value: 0}
    bool found = false
    for field i in 0..2 do
        found = if !found && gps_longi[i] == denger_place_longi && gps_lati[i] == denger_place_lati then true else false fi
        res = if found then variant {type: 0, value: i} else res fi
    endfor
    return res

def calc_rick(field gps_longi, field gps_lati) -> (field):
    // calcurate some score
    field some_score = 30
    return some_score

def calc_safe_score(private field[2] gps_longi, private field[2] gps_lati) -> (field):
    field denger_place_longi = 348186736
    field denger_place_lati = 1355238724

    variant index = variant {type:0, value:0}
    index = search_place(gps_longi, gps_lati, denger_place_longi, denger_place_lati)
    field safe_score = if index.type == 0 then 100 - calc_rick(gps_longi[index.value], gps_lati[index.value]) else 100 fi

    return safe_score

def main(private field[2] gps_longi, private field[2] gps_lati) -> (field):
    field res = calc_safe_score(gps_longi, gps_lati)
    return res