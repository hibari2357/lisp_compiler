
; branch no-type-define
(+ 1 2)
(+ 1 (* 2 (+ 4 3)))
(define a 1)
(+ a 2)
(define add (lambda (a b) (+ a b)))
(define add (lambda (a b c) (+ a (* c b))))
(define add (lambda (a) (+ a b)))

; branch typed-define
(define (field add) (lambda (field a field b) (+ a b)))
(define (field add) (lambda (field a field b field c) (+ a (* b c))))

; call function define addをしてから
(add 1 2)
(minus 1 2)
; (define a 1), (define b 2)をやってから
(add a b)
(add a c)

;let
(let (field a 1 field b 2) (+ a b))
(let (field a 1 field b 2 field c 3) (+ a (* b c)))
(let (field a 1 field b 2) (+ a c))
;(define (field add) (lambda (field a field b) (+ a b)))をしてから
(let (field a 1 field b 2) (add a b))
(define (field addsome) (lambda (field a field b) (let (field c 10 field d 20) (+ a (+ b (add c d))))))

;(define (field add) (lambda (field a field b) (+ a b))) してから
;let bindingsの
;(define (field addsome) (lambda (field a field b) (let (field c (add a b) field d 20) (+ a (+ b (add c d))))))

;letのbindingsの評価、つまり変数、式、ヴァリアント型
(let (field a 1 field b a) (+ a b))
(let (field a 1 field b (+ 1 2)) (+ a b))
;(define (field add) (lambda (field a field b) (+ a b))) してから
(let (field a (add 1 2)) (+ a 3))

;if
(if 1 2 3)
;(define (field add) (lambda (field a field b) (+ a b))) してから
(if (= 1 2) (+ 3 4) (add 6 7))
(let (field a 2 field b 2) (if (= a b) (+ a b) 0))


;variant宣言(型チェックはまだ)
;(define (field add) (lambda (field a field b) (+ a b))) してから
(let ((| field void) v (add 1 2)) (match v (field (+ v 1)) (void 1)))
(let ((| field void) v (add 1 2)) (match v (field (+ v (* v 2))) (void (+ 1 2))))









