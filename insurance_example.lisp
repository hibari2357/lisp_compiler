そもそもlispにstructないんだが？
それも実装しないといけなくないか？？

んーとりあえずあとで実装するってことで文法だけ決める。
んーわからね。
つーかループとかできねーんじゃねーの？
んーr5rsだとdoは書いてるんか。もともとはないんだよなぁ。まぁとりあえずこれで。
んーで、vectorも使っとるなぁ、その辺の実装は最悪なしでええや。
は？？わけわからなさすぎるが？？？？？
returnないってどういうこっちゃねん。




https://www.scheme.com/tspl4/records.html#./records:h0

(define-record-type gps_format (fields time longi lati))

これgps_formatって型だってかけないよな普通。
(define search_place
  (lambda (gps_format gps_log[N] gps_format denger_place)
    ((do (i 0 (+ i 1))
      ((= i gps_log.size))
      (if(gps_log[i]-longi == denger_place-longi && gps_log[i]-lati == danger_place-tati) 
        return i
        return void
        っぽく描きたいんだが？？？？
      )
    )
  )
))

(define calc_risk
  (lambda (danger_place) (~~~~))
)

(define calc_safe_score
  (lambda (gps_format gps_log[N])
    複数命令実行のdoだけど混同するんだが???
    そもそももともと可能なのか？
    (do 
      (define safe_score 0)
      (define danger_place (make-gps_format null 348186736 1355238724))

      でー そもそもlispが動的型付けなんだが、ヴァリアント型の恩恵あんのか？？？？
      は？わからねーーー。lispにする必要あんのか謎。どーせ実装せんならcでよくね？？


    )
  )
)