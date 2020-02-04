
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
(let (field a 1 field b 2) (+ a c))
(let (field a 1 field b 2 field c 3) (+ a (* b c)))
(define (field addsome) (lambda (field a field b) (let (field c 10 field d 20) (+ a (+ b (+ c d))))))

;(define (field add) (lambda (field a field b) (+ a b))) してから
(define (field addsome) (lambda (field a field b) (let (field c 10 field d 20) (+ a (+ b (add c d))))))