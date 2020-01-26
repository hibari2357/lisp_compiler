(define search_place
  (lambda (gps_longi gps_lati denger_place_longi denger_place_lati)
    (for-each 
      (lambda (longi lati)
        (if (&& (= longi denger_place_longi) (= lati denger_place_lati))
          (return (define (int) index))
        )
      )
    )
    (let (void ret) (ret))
  )
)

(define calc_risk
  (lambda (gps_longi gps_lati)
    (let (int some_score 30) (some_score))
  )
)

(define calc_safe_score
  (lambda (gps_longi gps_lati)
    (let (
      (int safe_score 100)
      (int denger_place_longi 348186736)
      (int denger_place_longi 348186736)
      ((| int void) index (search_place gps_longi gps_lati denger_place_longi denger_place_lati))
      )
      (
        (match (index)
          (int (- safe_score (calc_risk gps_longi gps_lati)))
          (void safe_score)
        )
      )
    )
  )
)

(define main
  (lambda (gps_longi gps_lati)
    (calc_safe_score gps_longi gps_lati)
  )
)