---
title: "Learning Swift - Basic Types"
date: 2020-08-16
tags:
    - iOS
    - Swift
    - Swift-book
summary: Swift 基本型別
---

![Swift Basic Types](@assets/20200816/banner.jpg "Swift Basic Types")

# 基本型別

---

## 整數 ( Intergers )

整數是沒有小數點的數值，可分為：

- **有符號** → 正數、負數或是零
- **無符號** → 正數或零

Swift 也提供了 8、16、32 以及 64 位元的整數型別，命名規則也遵循 C，比如 8 位元的無符號整數叫做 **UInt8**；32 位元的有符號整數叫做 **Int32**。

### 整數的範圍 ( Integer Bounds )

以**無符號整數**來說，可以從官方 API `Swift > Math > Intergers` 來看，有一個 **UnsignedInteger** 的協定，並且擴展了 **UnsignedInteger** ，在裡面宣告兩個靜態變數 max 和 min，這樣一來可以藉由這兩個屬性來取得最大值以及最小值。

```swift
public protocol UnsignedInteger : BinaryInteger {
}

extension UnsignedInteger where Self : FixedWidthInteger {
    // ... 略 ...

    /// The maximum representable integer in this type.
    ///
    /// For unsigned integer types, this value is `(2 ** bitWidth) - 1`, where
    /// `**` is exponentiation.
    public static var max: Self { get }

    /// The minimum representable integer in this type.
    ///
    /// For unsigned integer types, this value is always `0`.
    public static var min: Self { get }
}
```

所以我們就可以這樣來取得 UInt8 最大和最小值。

```swift
let maximumValue = UInt8.max
let minimumValue = UInt8.min
```

**有符號整數**也是一樣的喔 🙂

同一份檔案中，可以看到有個叫做 **SignedInteger** 的協定，在擴展協定中也有兩個靜態變數：**max** 和 **min**。

```swift
public protocol SignedInteger : BinaryInteger, SignedNumeric {
}

extension SignedInteger where Self : FixedWidthInteger {
    // ... 略 ...

    /// The maximum representable integer in this type.
    ///
    /// For signed integer types, this value is `(2 ** (bitWidth - 1)) - 1`,
    /// where `**` is exponentiation.
    public static var max: Self { get }

    /// The minimum representable integer in this type.
    ///
    /// For signed integer types, this value is `-(2 ** (bitWidth - 1))`, where
    /// `**` is exponentiation.
    public static var min: Self { get }
}
```

### Int 與 UInt

有很多時候，在定義一個整數時，我們不太會去特別定義要使用多少位元的整數，通常都會使用 **Int** 或是 **UInt**，Swift 也提供了這兩種特別的整數型別，然而這個型別使用的位元長度就等於你電腦使用的位元長度。

- 在 32-bit 的環境，Int 等同於 Int32
- 在 64-bit 的環境，Int 等同於 Int64

然而無符號整數也是這樣。

- 在 32-bit 的環境，UInt 等同於 UInt32
- 在 64-bit 的環境，UInt 等同於 UInt64

## 浮點數 ( Float, Double )

浮點數是帶有小數點的數值，分為兩種類型：

- **單精度浮點數 ( Float )** → 佔用記憶體 32bits
- **雙精度浮點數 ( Double )** → 佔用記憶體 64bits

顧名思義，兩個的差異就差在精確度， Float 可表示 6 位數，但是 Double 至少可以表示 15 位數。

還記得[基本型別](https://andrewwuu.com/article/the-basics/)提到的型別推斷嗎？在宣告浮點數時，如果不特別標記型別的話，會自動判斷為 Double。

```swift
let bmi = 23.79 // Type is Double.
let bmi: Float = 23.79 // Type is Float.

let pi = 3 + 0.14159 // Type is Double.
```

至於如何選擇，就要看你的需求，如果數值在哪種型態都適用的情況下，還是會建議用 Double。

## 數值的型別轉換 ( Numeric Type Conversion )

### 溢位問題 ( Overflow )

即使我們知道要宣告的變數或是常數是非負數時，我們也不會特別去註記 UInt；或是已經知道數值的範圍大概會落在什麼區間，也不太會去特別宣告要使用什麼大小的整數型別，這樣一來就可以直接使用，不用擔心任何意外錯誤。

除非今天要做到優化或是特別處理時，才會特別定義其他整數型別，這也有個好處是可以快速知道溢位的問題。

```swift
let cannotBeNegative: UInt8 = -1
// UInt8 cannot store negative numbers, and so this will report an error
let tooBig: Int8 = Int8.max + 1
// Int8 cannot store a number larger than its maximum value,
// and so this will also report an error
```

### 轉換 ( Conversion )

如果今天要將兩個不同型別的變數或常數互相做運算，此時就需要轉換成相同型別，以下面這個例子為例：

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
```

如果沒有將 **three** 轉換成 Double 型別的話，在編譯時會跳出 `Binary operator '+' cannot be applied to operands of type 'Int' and 'Double`，不允許這樣執行加法。

但是在浮點數那個段落裡，為什麼可以不用轉換型別就可以將 3 跟 0.14159 相加？

![Swift conversion](@assets/20200816/monkey-shock.gif "Swift conversion")

因為數字變數或常數的運算與數字文字的運算規則不同，因為數字文字本身沒有明顯標註型別，只有在編譯的時候才會透過型別推論推斷出它的型別，因此已經宣告的變數或常數必須得透過型別轉換才能執行運算。

## 型別別名 ( Type Aliases )

簡單來說就是將型別取一個綽號，可以透過 `typealias` 這個關鍵字來實作。

當你想透過上下文，替既有的型別給予一個更清楚的別名時，這個方式就很好用。

```swift
typealias SampleRateConversion = UInt16
let maximumValue = SampleRateConversion.max
```

SampleRateConversion 定義為 UInt16 的別名，實際上 `SampleRateConversion.max` 會去呼叫 `UInt16.max`，再回傳給 **maximumValue** 常數。

## 布林值 ( Booleans )

Swift 的布林型別叫做 **Bool**，布林值又稱邏輯值，因為他只能是 **true** 或是 **false**。

```swift
let 我的身高有一百八 = true
let 太陽從西邊升起 = false
```

跟上面的 Double 以及 Int 一樣，透過型別推論初始值可以得知，這兩個常數的型別都是 Bool，透過型別推論，也可以讓程式碼更簡潔~~有力~~，對於流程控制布林值就很方便，之後章節會再提到。

```swift
if 我身高有一百八 {
	print("人生勝利了")
} else {
	print("人小志氣高")
}

// 最後會 print 出 "人生勝利了"
```

## 元組 ( Tuples )

你可以使用 Tuple 將多個資料（ 可以不同型別 ）組合成一個複合值，可以用來存取及傳遞。

舉個例子，這邊有一個 Tuple 用來描述 HTTP status code，當你送出 request 時，伺服器回傳的 response。

```swift
let http404Error = (404, "Not Found")
// http404Error 是一個 (Int, String) 的 Tuple。
```

在宣告變數你也可以使用 Tuple 作為初始值。

```swift
let (code, message) = http404Error
print("The status code is \(code)")
print("The status message is \(message)")
```

如果你只需要 Tuple 中某些資料時，你可以使用 `_` 忽略。

```swift
let (code, _) = http404Error
print("The status code is \(code)")
```

如果你不想透過變數或常數來去存取資料的話，也可以在 Tuple 後面加索引值 ( **第一個索引值為 0** ) 去取得裡面的資料。

```swift
print("The status code is \(http404Error.0)")
// Prints "The status code is 404"
print("The status message is \(http404Error.1)")
// Prints "The status message is Not Found"
```

但是用這種索引值的方式，就程式碼的易讀性來說會比較差，所以你可以替每個值命名，這樣程式碼看起來就比較清楚在做什麼。

```swift
let http404Error = (statusCode: 404, statusMessage: "Not Found")
print("The status code is \(http404Status.statusCode)")
print("The status message is \(http404Status.statusMessage)")
```