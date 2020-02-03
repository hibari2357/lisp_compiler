
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

