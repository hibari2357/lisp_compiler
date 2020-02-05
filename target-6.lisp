
バリアントを返す関数
(define ((| field void) check)
  (lambda (field a field b)
    (if (= a b)
      (+ a b)
      nil
    )
  )
)

(let ((| field void) v (check 1 2))
  (match v 
    (field (+ v 1))
    (void nil)
  )
)


struct variant {
    field type
    field value
}

def check(field a, field b) -> (variant):
  variant res = variant {type:0, value:0}
  res = if a == b then variant {type:1, value:(a + b)} else variant {type:0, value:0} fi
  return res

variant v = variant {type:0, value:0}
v = check(1, 2)
if v.type === 0 then v.value + 1 else fi






ーーーーーーメモーーーーーー

こんな感じか？
でxの型を見てfieldやな→variant{type:0}
yの型見てvoidやな。->variant{type:1}


これにエラーを出したい。
(let ((| field void) v (check 1 2))
  (+ v 1)
)

パターンマッチングをすると値を取り出せる。
記述はこう。
これどういう型を返してるか非常に分かりにくいが、まぁヴァリアントですね。
んーそれでいいのか。いやこれintかvoidのどっちかを返してるね。ヴァリアントではない。だから整数で受けれる？マ？
いやそんなわけない、どっちが帰ってくるかわからんのに整数で受けれるわけないやん。
あ、そうかこれはletにvoidを返させてるからだな。fieldのとき(+ v 1)、voidのとき、1、って感じでやればfieldを返してる。
んーletって宣言した値を返してるイメージあったけど、そうじゃないことももちろんあるよな。bool宣言してfieldのリテラルを返すって感じの
場合もあるんだから。field宣言してboolのリテラル返してる場合だってある。

(let ((| field void) v (check 1 2))
  (match v 
    (field (+ v 1))
    (void nil)
  )
)

内部的にはこう
これはmatch内でエラーのチェックをしないため
(let ((| field void) v (check 1 2))
  (match v 
    (field (let (field v) (+ v 1)))
    (void (let (void v) 1))
  )
)

これいい感じじゃあないですか？？？





