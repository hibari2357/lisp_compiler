


(define search_place
  (lambda (gps_format gps_log[N] gps_format denger_place)
    ((do (i 0 (+ i 1))
      ((= i gps_log.size))
      (if(gps_log[i]-longi == denger_place-longi && gps_log[i]-lati == danger_place-tati) 
        return i
        return void
      )
    )
  )
))

(define calc_risk
  (lambda (danger_place) (~~~~))
)

(define calc_safe_score
  (lambda (gps_format gps_log[N])
    (do 
      (define safe_score 0)
      (define danger_place (make-gps_format null 348186736 1355238724))



    )
  )
)

(define main
  (lambda ())

)