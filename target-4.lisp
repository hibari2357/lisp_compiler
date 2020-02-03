(define (field add) 
  (lambda (field a field b) 
    (+ a b)
  )
)

def add(field a, field b) -> (field):
  return (a + b)
