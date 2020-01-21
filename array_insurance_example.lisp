
//[FIX ME] define/for-each/index/return

(define search_place
  (lambda (gps_longi gps_lati denger_place_longi denger_place_lati)
    (for-each 
      (lambda (longi lati)
        (if (&& (= longi denger_place_longi) (= lati denger_place_lati))
          (return (define (int) index))
        )
      )
    )
    (define (void))
  )
)

(define calc_risk
  (lambda (gps_longi gps_lati)
    (define (int) some_score 30)
  )
)

(define calc_safe_score
  (lambda (gps_longi gps_lati)
    (define (int) (denger_place_longi 348186736))
    (define (int) (denger_place_lati 1355238724))
    (define (| int void) (index (search_place  gps_longi gps_lati denger_place_longi denger_place_lati)))
    (match (index)
      (int (set! (int) safe_score (- 100 (calc_risk gps_longi gps_lati))))
      (void (set! (int) safe_score 100))
    )
  )
)

(define main
  (lambda (gps_longi gps_lati)
    (calc_safe_score gps_longi gps_lati)
  )
)
