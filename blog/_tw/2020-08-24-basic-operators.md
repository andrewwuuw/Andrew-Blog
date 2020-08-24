---
title: "[一起來看 Swift 官方文件] - Basic Operators"
date: 2020-08-24 22:35
tags:
    - iOS
    - Swift
    - 一起來看 Swift 官方文件
summary: 對於 Swift 基本運算子你了解多少？
---

![[一起來看 Swift 官方文件] - Basic Operators](@assets/20200824/banner.jpg "[一起來看 Swift 官方文件] - Basic Operators")

# 基本運算子 ( Basic Operators )

今天要來介紹基本運算子，什麼是運算子？

程式碼的組成中，有兩個重要的元素**運算元**以及**運算子**，透過這兩個元素的組合而成的叫做**運算式**。

- `運算元`：用來執行某個運算功能的數值
- `運算子`：用來執行運算的符號

直接從下列例子來看：

```swift
myName = firstName + lastName
```

其中 `firstName` 與 `lastName` 就是運算元，`+` 則是運算子。

## 一、二 ... 三元 ( Arity )

Swift 運算子可分為：

- `Unary`：Unary 允許使用前綴與後綴的方式單一個目標進行操作，常見的像是正負值或是遞增遞減。
- `Binary`：使用兩個數值進行運算，這種方式就是我們平常使用的二元運算。
- `Ternary`：可以針對三個目標進行操作，Swift 只有一種三元運算的方式 ( `... ? ... : ...` )，又可以叫做三元條件運算子。

```swift
let unary1 = -100
let unary2 = !true
let unary3 = Int("123")!

let binary = 1 + 2

let ternary = unary2 ? "Good" : "Bad"
```

## Assignment Operator

如果你看過前幾章，那你應該對這個已經蠻熟悉的。

開頭有一個例子，將 **firstName** 與 **lastName** 相加指派給 **myName** 作為初始值，其中使用的 `=` 就是所謂的 **Assignment Operator**。

除了這樣的用法之外，還記得基本型別中提到的 [Tuple](https://andrewwuu.com/tw/2020/08/16/basic-types/#%E5%85%83%E7%B5%84-tuples) 用法嗎？這邊也可以使用 assignment operator 初始化兩個不同變數或常數。

```swift
let (height, weight) = ("180cm", "75kg")
print(height) // 180cm
print(weight) // 75kg
```

在 Swift 中，**Assignment Operator** 本身不會回傳值，所以你不能在 **if 判斷句**使用。

```swift
if myName = "金城武" {
	...
}

// invalid!
```

## 算術運算子 ( Arithmetic Operators )

Swift 提供了下列幾個 arithmetic operators：

- `+`：Addition
- `-`：Substraction
- `*`：Multiplication
- `/`：Division
- `%`：Remainder ( 又稱**模數運算子**，**Remainder Operator** )

```swift
100 + 200   // 300
10 - 8      // 2
9 * 9       // 81
10 / 4      // 2
11 % 2      // 1
```

咦？你有發現一個奇怪的事情嗎？`10 / 4` 為什麼會等於 `2`，這裡的用法是取商嗎？

其實這也是我覺得 Swift 強大的地方，還記得基礎篇的[型別推論](https://andrewwuu.com/tw/2020/08/10/the-basics/#%E5%9E%8B%E5%88%A5%E6%8E%A8%E8%AB%96-type-inference)嗎？

Swift 會依照二元運算元的型別推論出運算出來的型別，上面這個例子，運算出來的結果就是 **Int**，如果今天把其中一個運算元加上 `.0`，運算出來的結果，型別就會被推斷為 Double ( [預設推斷浮點數為 Double](https://andrewwuu.com/tw/2020/08/16/basic-types/#%E6%B5%AE%E9%BB%9E%E6%95%B8-float-double) )。

```swift
let intResult = 10 / 4
let doubleResult1 = 10.0 / 4
let doubleResult2 = 10.0 / 4

print(type(of: intResult))        // Int
print(type(of: doubleResult1))    // Double
print(type(of: doubleResult2))    // Double
```

## Compound Assignment Operators

介紹完 **Assignment Operator** 以及 **Arithmetic Operators**，接下來就來介紹他們的合體技，**Compound Assignment Operators**。

一般我們在表達 `a = a + 1` 時，可以簡化成 `a += 1`，像這種將 arithmetic operator 在前，assignment operator 在後的這種運算子又稱 **Compound Assignment Operators**。

```swift
var a = 1   // a = 1
a = a + 1   // a = 2
a += 1      // a = 3
```

當然你也可以使用其他算術運算子：

```swift
var a = 2   // a = 2
a = a * 2   // a = 4
a *= 2      // a = 8
```

### 冷知識

其實在 Swift 3 以前是可以使用 `++` 和 `--` 來操作遞增以及遞減，但是這種用法最主要的原因就是開發 Swift 人員認為如果你是一個沒學習過其他程式語言的初心者，對於這種運算子只會徒增學習 Swift 的負擔，於是乎移掉了這兩種運算子，當然還有很多原因，在 Swift Evolution #0004 提出了七個缺點，這是其中一點，如果想知道更多，可以參考 [SE-0004](https://github.com/apple/swift-evolution/blob/master/proposals/0004-remove-pre-post-inc-decrement.md)。

## 比較運算子 ( Comparison Operators )

Swift 提供了下列幾種 comparison operators：

- `==`：Equals
- `!=`：Not Equal
- `>` ：Greater than
- `<` ：Less than
- `>=`：Greater than and Equals
- `<=`：Less than and Equals

```swift
100 == 100   // ture
100 != 100   // false
200 > 100    // true
200 < 100    // false
300 >= 300   // true
299 <= 300   // true
```

### 冷知識

其實除了 `==` 之外，還有一個特殊的比較運算子是 `===`，主要是用來判斷兩個運算元是否為相同的實體，現在來說有點抽象，後面就會補充介紹。

## 空值聚合運算子 ( Nil-Coalescing Operator )

這到底是蝦咪挖哥？聽起來這麼饒口，Nil-Coalescing Operator 的運算子長成這樣 `a ?? b`。

這對於 [Optional](https://andrewwuu.com/tw/2020/08/16/optionals/) 型別的變數相當好用，假定 a 是一個 Optional，如果當它為 nil 時，就回傳 b 值。

如果 a 有值的話，就不考慮 b，這種方式稱為 **Short-Circuit Evaluation**。

如果使用三元運算子，寫起來會像這樣：

```swift
a != nil ? a! : b
```

但這樣其實不太好讀，所以我們可以用這樣來改寫，效果是一樣的：

```swift
a ?? b
```

```swift
let name = "金城武"
var nickName: String?
print(nickName ?? name)  // 金城武

nickName = "宜蘭金城武"
print(nickName ?? name)  // 宜蘭金城武 ( via Short-Circuit Evaluation )
```

## 邏輯運算子 ( Logical Operators )

Swift 提供了幾個 logical operators：

- `!` ：NOT
- `&&`：AND
- `||`：OR

```swift
!true          // false

true && false  // false
true && true   // true

true || false  // true
false || false // flasea
```

在邏輯判斷中，也是遵從 **Short-Circuit Evaluation**，以 OR 運算為例，由左至右的運算過程中，只要找到一個為 **true**，右邊的邏輯就不會再看了，因為後面結果如何都沒辦法改變運算式的結果。

你可以組合多個 logical operators，來進行判斷：

```swift
if isRain && noUmbrella || noRainCoat {
  print("我是落湯雞")
}
```

如果要讓這段程式更容易閱讀，可以加上括弧 `()`。

```swift
if (isRain) && (noUmbrella || noRainCoat) {
  print("我是落湯雞")
}
```

這樣就可以更清楚知道假使下雨的時候，你又沒有雨傘或雨衣時，你就會被淋成落湯雞。

## Range Operators

最後一個是比較特別的運算子，有時候我們想在一段序列中進行操作，我們可能就是宣告一個陣列，初始值宣告可能會是 `[1, 2, 3, 4 , 5, 6]`，但是如果今天要宣告的是 100 呢？又或是只想取得 100 以下的所有數值，那該怎麼辦？

Swift 提供幾個 range operators：

- `Int...Int`：Closed Range Operator
- `Int..<Int`：Half-Open Range Operator
- `Int...`, `...Int` or `..<Int`：One-Sided Ranges

```swift
1...10
1..<10
1...
...10
..<10
```

針對 **Closed Range Operator** 或是 **Half-Open Range Operator**，因為他是一個 Collection，你可以使用 `for ... in loop`，走訪每一個數值：

```swift
for i in 0...10 {
    print(i)  // 0 ~ 10
}

for i in 0..<10 {
    print(i) // 0 ~ 9
}
```

你可以使用 `Range.contains()`，來確認數值是否存在於 One-Sided Ranges 中。

```swift
let range = ...100
range.contains(1)     // true
range.contains(0)     // true
range.contains(-100)  // true
```

One-Sided Ranges 不僅可以使用上限也可以界定下限，但是這些都沒註明要從哪裡開始或是從哪裡結束，所以它的範圍會無限地延伸，至該型別最大值或最小值，所以使用的時候請小心，否則就是使用 **Closed Range Operator** 或是 **Half-Open Range Operator** 明確地定義邊界。

---

- 上一篇: <router-link to="/tw/2020/08/22/strings-and-characters/">[一起來看 Swift 官方文件] - Strings and Characters</router-link>