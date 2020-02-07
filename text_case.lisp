
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
(if (&& (= 1 2) (= 3 4)) (+ 5 6) (+ 7 8))


;variant宣言(型チェックはまだ)
;(define (field add) (lambda (field a field b) (+ a b))) してから
(let ((| field void) v (add 1 2)) (match v (field (+ v 1)) (void 1)))
(let ((| field void) v (add 1 2)) (match v (field (+ v (* v 2))) (void (+ 1 2))))

;variantを返す関数
(define ((| field void) check) (lambda (field a field b) (if (= a b) (+ a b) nil)))
;def check(field a, field b) -> (variant):
;  return if (a == b) then variant {type: 0, value: (a + b)} else variant {type: 1, value: 0} fi


;型チェック
;初期値がリテラル
(let (field a 1) a)
(let (field a false) a) ;typeof initial_value is 'bool', but typeof a is 'field'
(let (field a 1 field b false) (+ a b)) ;typeof initial_value is 'bool', but typeof b is 'field'
;初期値が変数
(let (field a 1) (let (field b a) (+ a 1)))
(let (field a 1) (let (bool b a) (+ a 1))) ;typeof initial_value is field, but typeof b is 'bool'

;初期値が演算/関数
(let (field a (+ 1 2)) a)
(let (bool a (+ 1 2)) a) ;typeof initial_value is field, but typeof a is 'bool'


;引数の型、個数チェック
(+ 1 2)
(+ false 2) ;typeof + param is 'field', but typeof arg is 'bool'
(+ 1 (+ 2 3))
(+ 1 (+ 2 false)) ;typeof '+' param is 'field', but typeof arg is 'bool'
(let (field a 1) (+ a 2))
(let (bool a false) (+ a 2)) ;typeof + param is 'field', but typeof arg is 'bool'

;関数の引数の型チェック
(define (field add) (lambda (field a field b) (+ a b)))
(+ (add 1 2) 3)
(let (field a 1) (+ a (add 2 3)))
(add 1 2)
(add 1 false) ;typeof 'add' param is 'field', but typeof arg is 'bool'

;オペランドに関数が入るときのチェック
(define (bool foo) (lambda () false))
(+ (foo) 3) ;typeof '+' param is 'field', but typeof arg is 'bool'
(let (field a 1) (+ a (add 2 3))) ;typeof '+' param is 'field', but typeof arg is 'bool'

;引数の個数のチェック
(define (field add) (lambda (field a field b field c) (+ a (* b c))))
(add 1 2) ;'add' takes 3 params, but given 2

;variant型の関数のset
(define ((| field void) check) (lambda (field a field b) (if (= a b) (+ a b) 1)))
;(define (field add) (lambda (field a field b) (+ a b))) してから
(let ((| field void) v (add 1 2)) (+ 3 4)) ;typeof initial_value is field, but typeof v is 'field | void'
(let ((| field void) v (check 1 2)) (+ 3 4))
; <global>
; struct variant {
;   field type
;   field value
; }
; </global>
; variant v = variant {type: 0, value: 0}
; v = check(1, 2)
; (3 + 4)

(define ((| field void) check) (lambda (field a field b) (if (= a b) (+ a b) 1)))
(let ((| field void) v (check 1 2)) (+ v 3)) ;typeof '+' param is 'field', but typeof arg is 'field | void'


(let ((| field void) v (check 1 2)) (match v (field (+ v 1)) (void 1)))
; <global>
; struct variant {
;   field type
;   field value
; }
; </global>
; variant v = variant {type: 0, value: 0}
; v = check(1, 2)
; if v.type == 0 then (v.value + 1) else 1 fi




(define (bool add) (lambda () false))













