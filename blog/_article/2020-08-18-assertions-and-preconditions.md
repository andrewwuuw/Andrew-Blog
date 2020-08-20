---
title: "Learning Swift - Assertions and Preconditions"
date: 2020-08-18
tags:
    - iOS
    - Swift
    - Swift-book
summary: Swift assertions, preconditions and fatalError。
prev: ./2020-08-16-Optionals.md
next: false
---

![Learning Swift - Assertions and Preconditions](@assets/20200818/banner.jpg "Learning Swift - Assertions and Preconditions")

## Assertions and Preconditions

這是延續 [Swift 基礎篇](https://andrewwuu.com/article/2020/08/10/the-basics/) 的小小番外篇，今晚，我想來點 **Assertions and Preconditions**。

針對程式碼，我們很常使用到判斷式去決定要做什麼事情，有的時候也會期待一個變數或常數經過透過某個 Function 或是處理之後，應該要符合某種條件。

Swift 提供了這兩種方法，讓開發者表達所設的假設與期望，確保透過這兩個條件驗證結果符合你的預期。

---

### Assertions

Assertion 就中文意思來說就是**斷言**或是**明確肯定**，顧名思義可以用來保證某個條件是否為真。

剛剛提到他可以用來判斷邏輯，所以條件判斷結果為真的時候，程式碼就會看起來像沒事一樣地繼續往下執行，但如果判斷結果為否，程式碼就會立即中斷，對於 APP End-User  的角度來看，就是俗稱的 **Crash**。

國文的分數必須是 0 分以上，不可以有負數的情況，所以透過 Global Function `assert(國文分數 > 0)` 來進行判斷，如果條件通過程式碼才能繼續執行，我們來看底下的範例：

```swift
var 國文分數 = 87
assert(國文分數 > 0)
```

但是，不通過會怎麼樣嗎？

```swift
var 國文分數 = -1
assert(國文分數 > 0)
// Assertion failed: file ..., line 2
```

![assertion failed](@assets/20200818/chinese_score.png "Swift assertion failed")

在 Xcode 中就會跳出錯誤訊息，並且跟你說程序已被中斷，並且在 Output 印出 `Assertion failed`，還提醒你錯在第幾行，貼心 <3。

![@assets/20200818/so_sweet.gif](@assets/20200818/so_sweet.gif)

但是這樣的錯誤訊息，現在練習當然很清楚知道錯在哪裡，但是如果是在好幾萬行 Code 的專案中，還是希望可以不用再~~透過觀落陰~~考古，才能得知為什麼錯，我們來看一下官方 API `Swit > Assert`有什麼提示可以新增：

```swift
public func assert(_ condition: @autoclosure () -> Bool,
					_ message: @autoclosure () -> String = String(),
					file: StaticString = #file, line: UInt = #line)
```

可以從上面發現，原來有個 message 可以使用，官方 API 對於 message 是這樣說明：`A string to print if condition is evaluated to false. The default is an empty string.`，**message** 這個 Parameter 預設值是空字串，所以我們更清楚地知道，原來是可以加註一些說明，這樣一來在發生判斷失敗的時候，就可以快速知道是什麼錯誤原因。

```swift
var 國文分數 = -1
assert(國文分數 > 0, "分數不可以為負數！")
// Assertion failed: 分數不可以為負數！: file ...
```

還有一個 `assertionFailure()`，這個方法你可以把它想像成 `assert(false)`，會讓程式碼中斷，例如你可以用~~別人的Code中~~在 Switch Control Flow 的 Default 中加上 `assertionFailure()`，條件都不符合的時候執行中斷。

### Preconditions

在 [Optionals 這篇文章](https://andrewwuu.com/article/2020/08/16/optionals/#optionals)開頭有提到，字串轉整數的初始化方法，可以到 [Swift GitHub](https://github.com/apple/swift/blob/da61cc8cdf7aa2bfb3ab03200c52c4d371dc6751/stdlib/public/core/IntegerParsing.swift) ( **swift/stdlib/public/core/IntegerParsing.swift** ) 上看到這個初始化方法的原始碼，在 152 行可以發現，也有用到 `precondition`來去做 radix 的判斷。

preconditions 其實跟 assertions 很像，連 API 都長得 87% 像，都是用來判斷條件。

```swift
public func precondition(_ condition: @autoclosure () -> Bool,
						 _ message: @autoclosure () -> String = String(),
						 file: StaticString = #file, line: UInt = #line)
```

當然 Precondition 也有 `preconditionFailure()`。

但是這樣跟 assertions 到底有什麼差別呢？差別就在於 assertions 只會在 Debug 環境下被編譯執行，在 Release 則不會，可以簡單開個 Xcode Project

![Swift assertions](@assets/20200818/rubbing_eyes.gif "Swift assertions")

- 點選 `*.xcodeproject`檔案 > Build Setting > Apple Clang - Code Generation > Optimization Level

![Optimization Level](@assets/20200818/OL.png "Optimization Level")

我們可以看到：

  - Debug 的 [Optimization Level](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst?source=post_page---------------------------#enabling-optimizations) 是 **None[-O0]**
  - Release 的則是 **Fastest, Smallest [-Os]**

在預設的情況下，Debug 環境對於優化的等級採最低限度地優化，也意味著會完全保留所有 debug 資訊，如果想知道更多 Optimization Level 的消息，可以到 GCC 官網的[文件](https://gcc.gnu.org/onlinedocs/gnat_ugn/Optimization-Levels.html)查看。

除了 assertions 在優化等級的限制，preconditions 也有特別的規則，在 **[-Ounchcked]** 的規則下，preconditions 不會被檢查。

但有一個特別的方法不受到優化等級的限制，叫做 `FatalError()`，跟 `assertionFailure` 還有 `preconditionFailure` 很類似，一樣都會無條件中斷程序。

中文意思又叫做**致命錯誤**，聽起來有點中二，但確實是蠻危險的。

![fatalError](@assets/20200818/dangerous.gif "fatalError")

無論在什麼等級下都不會被優化，所以在任何環境都會執行，所以在使用的時候盡量避免，除非很明確的知道判斷結果為否的嚴重性跟 FatalError 是差不多的，再去使用，官方 API 是建議可以這麼做：

```
在還沒開發完成的地方加上 fatalError("Unimplemented")，在編譯的時候，跳出錯誤訊息，告訴開發人員還有地方沒有完成。
```