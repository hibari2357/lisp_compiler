(let (field a 1 field b 2) (+ a b))

field a = 1
field b = 2
(a + b)


(define (field addsome)
  (lambda (field a field b)
    (let (field c 10 field d 20)
      (+ a (+ b (+ c d)))
    )
  )
)


def addsome(field a, field b) -> (field):
  field c = 10
  field d = 20
  return (a + (b + (c + d)))