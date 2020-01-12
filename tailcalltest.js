// 階乗を計算する関数（末尾再帰バージョン）
function factorial(n) {

    // 末尾再帰関数
    function factorialTailCall(n, accum) {
      console.log(new Error().stack);
        if (n === 0) {
            return accum;
        }
        return factorialTailCall(n - 1, n * accum); // 自分自身を末尾呼び出し
    }

    var result = factorialTailCall(n, 1); // (Y)

    return result;
}

console.log(factorial(3)); // (X)