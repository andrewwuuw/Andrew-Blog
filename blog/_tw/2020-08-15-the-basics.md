---
title: "Swift 從零開始 - The Basics"
date: 2020-08-10
tags:
    - iOS
    - Swift
    - Swift 從零開始
summary: 到底什麼是 Swift 語言，他又是幹嘛的呢？
---

![Swift basic](@assets/20200815/banner.jpg)

# 基礎

---

Swift 除了有 C 語言或是 Objective-C 那些基本型別，像是 **Int、Double、Float、Bool 以及 String**，還提供了強大的集合型別：**Array、Set 和 Dictionary**。

Swift 跟 C 一樣，都可以透過自訂的名稱來宣告變數，並且透過變數來存取資料。Swift 也廣泛的使用無法改變其值的變數，這些通常被稱為常數，而且比 C 來得更加強大。

除了上述這些熟悉的型別外，Swift 還提供了一個在 Objective-C 中找不到的型別，**Tuple**。你可以使用 Tuple 將多個資料（ 可以不同型別 ）組合成一個複合值，可以用來存取及傳遞。

比較特別的是 Swift 用了 **Optional Type**，允許變數或是常數沒有值回傳 nil，像是使用 nil 在 Objective-C 指標上，但是 Optionals 適用於任何型別，不局限於類別，Optionals 又更安全而且更容易表達，這也是 Swift 最強大的核心功能之一。

Swift 是個 type-safe 語言，代表著你可藉由 swift 語言，了解在變數或是常數可使用的型別有哪些。如果你的 code 要求的是 String 型別，因為 type-safe 的關係，不允許你錯誤地傳遞非 String 型別資料給他，同樣的 Type  Safety 也防止你將非 Optional 型別存入 Optional 型別的變數或常數，Type Safety 可讓你在開發的時候及早發現及解決錯誤。

---

## 常數和變數 ( Constants and Variables )

常數或是變數，會將`名稱` ( 像是 welcomeMessage ) 與`特定型別` ( String ) 互相關聯。

> 常數一旦被宣告之後就不能再被更改，變數則可。

### 宣告 ( Declare )

在使用常數或是變數前，他們必須被宣告，你可以用 **let** 宣告常數；用 **var** 宣告變數。

假設現在有兩個資料需要被使用，最大密碼長度和當前密碼長度，你可以這樣宣告：

```swift
let 最大密碼長度 = 10
var 當前密碼長度 = 0
```

因為 **最大密碼長度** 不會更改，可以被宣告為常數，然而 **當前密碼長度** 會隨著輸入的密碼長度而變動，所以被宣告為變數。

你也可以一次宣告多個常數或是變數在同一行

```swift
var name = "宜蘭人安竹", age = 18, 身高 = 179.9
```

### 型別註記 ( Type Annotations )

當你在宣告變數或是常數時，可以加上型別註記來定義可以儲存的資料型別，使用方式如下：

**var 名稱: 型別 = 值**      ( 當然，var 也可以替換成 let )

我們可以在 **welcomeMessage** 這個變數，加上 String 的型別註記，說明他可以儲存整數型別的資料。

```swift
var welcomeMessage: String
```

所以我們也可以這麼說：「當前密碼長度是一個整數型別的變數」，而現在我們就可以安心設定任何字串到 welcomeMessage 變數。

```swift
welcomeMessage = "歡迎光臨“
```

你也可以一次註記多個變數

```swift
var 國文分數, 數學分數, 理化分數: Int
var 姓名: String, 年齡: Int, 身高, 體重: Double
```

### 型別推論 ( Type Inference )

如果今天沒有特別的標註型別的話，其實 Swift 會透過型別推論找出合適的型別給變數。

從上面的例子來說明，針對 **最大密碼長度** 這個常數，如果宣告的時候沒特別標註型別，直接給定初始值 10，在編譯時 Swift 會依據給訂的初始值，推斷你想要設定這個常數為 Int。

```swift
/*
在 Xcode 中，按著 Option 鍵，點擊最大密碼長度這個常數
可以看到它被推斷為 Int。
*/

let 最大密碼長度 = 10
```

## 註解 ( Comments )

> 可以透過註解的方式，了解程式內容或是有哪些 Known Issue 待解，註解的文字在編譯的時候不會被執行。

單行的時候，可以使用 **`//`** 。

```swift
// 這是註解文字，編譯的時候會被忽略。
// 一天一蘋果。
// 荷包的錢錢遠離我。
```

但是如果註解很多行的時候，一行一行地加會很麻煩。

如果要進行多行註解的話有另外一種方式可以使用 `**/* ... */**`，在這區塊裡的文字都不會被執行。

```swift
/*
你看
這樣就可以
多行註解了
不是柱柱姐
是註解
*/
```

然後比較特別的是，也可以**巢狀註解。**

```swift
/*
多行註解裡又包著一個註解

/*
大人啊
可以這樣包了又包的嗎
*/

答案是可以的
臨時要註解一大串程式碼，這個就很好用。
*/
```

## 分號 ( Semicolons )

不像以往 C 或是 Objective-C 語言，Swift 不需要在每段程式碼結尾加上分號，但是如果你想加的話，還是可以的喔。

```swift
let message = "我就是想加分號";
```

Swift 分號還有一個特點，如果想在同一行編寫多個單獨的程式碼，就必須加上分號。

```swift
let message = "我就是想加分號"; print(message)
```

---

- 上一篇: <router-link to="/tw/2020/08/07/type-methods/">型別方法</router-link>
- 下一篇: <router-link to="/tw/2020/08/16/basic-types/">Swift 從零開始 - Basic Types</router-link>