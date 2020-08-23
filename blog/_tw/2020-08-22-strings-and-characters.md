---
title: "[一起來看 Swift 官方文件] - Strings and Characters"
date: 2020-08-22 16:00
tags:
    - iOS
    - Swift
    - 一起來看 Swift 官方文件
summary: 很多你不知道的 Swift String 細節，像是 Unicode、Index 或是 Substring 大小事...
---

![banner](@assets/20200822/banner.jpg "[一起來看 Swift 官方文件] - Strings and Characters")

# 字串和字元 ( Strings and Characters )

String 其實是一連串的 character 所組合而成的，可以用不同型態來表示 String，像是 **"Hello, Swift!"**、**"Swift 字串與字元"** 或是 **"\u{24}"** ( Unicode scalar U+0024 )。

咦？什麼是 **"\u{24}"** 呢？這是一個 [Unicode](https://zh.wikipedia.org/wiki/Unicode)，Swift 近幾年橫空出世，對於 Unicode 其實提供了很多快速且相容的方式去處理，轉換成人看得懂的文字。

在[基本型別篇](https://andrewwuu.com/tw/2020/08/16/basic-types/)有稍微提到字串，讓我們來看一下可以如何使用。

## Unicode, Characters and Grapheme Cluster

在開始介紹 String 之前，先來談談 Swift 中如何用 Unicode 表達文字。

String 其實是一連串的 character 所組合而成，所以 character 只能被指派**一個字元**或是多**個 [Code Points](https://zh.wikipedia.org/wiki/%E7%A0%81%E4%BD%8D)** ( Unicode 的 code point 範圍是從 **0x00000 ~ 0x10FFFF** )，像這種多的 Code Points 序列又稱 **Grapheme Cluster**。

> Grapheme 是書寫系統中最小的單位，像是 a 或是 à 都是 grapheme，但是他們因為重音的差異，在使用 Code Points 表達時，後者多了一個 Code Point，像這種 Code point 的集合，就是一個 Grapheme Cluster。

```swift
let grapheme = "\u{0061}"  // a
let graphemeCluster = "\u{0061}\u{0300}"  // à
```

## String Literals

你可以使用雙引號 `""`，來去宣告一個 String，然而 Swift 會自動推斷為字串型別。

```swift
let predefineString = "This is a string."
```

如果你想使用多行數，你也可以使用三個引號 `"""`，去宣告一個 String。

```swift
let multilineString = """
This is multiline string.

"一次多行沒問題。"
"OK 的。"
"""
```

但是你不能用雙引號的方式來去表達多行數的字串，你會馬上看見 Xcode 的錯誤訊息。

![Swift single line string](@assets/20200822/single_line_string.png "Swift single line string")

以多行數的方式來表達有一點要注意的是，右引號前的空格是要告訴 Swift，在引號內的其他行都會忽略相同數量的空格。

```swift
let indentedString = """
	這行不會有空格
		這行有空格
	這行不會有空格
	"""
/*
	Prints:
	這行不會有空格
		這行有空格
	這行不會有空格
*/
```

### Special Characters in String Literals

如果你直接在字串裡使用雙引號，在編譯的時候就會出錯，但是想要在字串中輸入雙引號要怎麼辦呢？

![Swift double quotation](@assets/20200822/double_quotation.png "Swift double quotation")

Swift 提供了幾個規則，允許在 String 中輸入特殊字元：

- **特數字元**
    - `\0`：Null Character
    - `\\`：Backslash
    - `\t`：Horizontal Tab
    - `\n`：Line Feed
    - `\r`：Carriage Return
    - `\"`：Double Quotation Mark
    - `\'`：Single Quotation Mark
- [**Unicode**](https://zh.wikipedia.org/wiki/Unicode)
    - `\u{n}`：Unicode 的 scalar value，n 代表 1 至 8 位的十六進制數值

```swift
let nullCharacter = "空字元： 這是\0測試"
let backslash = "反斜槓： \\"
let horizontalTab = "水平縮排： 水平\t縮排"
let lineFeed = "換行： 一天\n一蘋果"
let carriageReturn = "回車： 一天\r一頻果"
let doubleQuotationMark = "\"Yeah，可以使用雙引號了\""
let singleQuotationMark = "\'Yeah，可以使用單引號了\'"
let unicodeString1 = "\u{0001f436}"
let unicodeString2 = "\u{6211}\u{7684}\u{8eab}\u{9ad8}\u{0031}\u{0038}\u{0030}\u{516c}\u{5206}"

/*
	Prints:
	空字元： 這是測試
	反斜槓： \
	水平縮排： 水平	縮排
	換行： 一天
	一蘋果
	回車： 一天一頻果
	"Yeah，可以使用雙引號了"
	'Yeah，可以使用單引號了'
	🐶
	我的身高180公分
*/
```

### 冷知識

- 你可以直接在多行數的字串直接使用 `"` 和 `'`，其他的也是可以使用，不過要加上 `\`。

    ```swift
    let multipleLineString = """
    可以使用 " '
    """
    ```

- 如果像在多行數字串再加上 `"""` 的話，也可以在前後引號加上 `#`，這樣就可以使用 `"""`。

    ```swift
    let multipleLineString = #"""
    可以使用 """
    """#
    ```

## Use String

### String Initialize

在開頭有提到，String 是由一連串的 character 組合而成，所以 character 在宣告初始值的時候，只接受一個字元。

```swift
let passedCharacterExample: Character = "A"  // Pass (O)
let failedCharacterExample: Character = "Apple"  // Failed (X)
```

String 使用 [Collection Protocol](https://developer.apple.com/documentation/swift/collection)，可以使用 `for ... in` loop 來走訪 String 中每一個 character。

```swift
for character in "Hello, Swift!" {
    print(character)
}

/*
	Prints:
	H
	e
	l
	l
	o
	,
	 
	S
	w
	i
	f
	t
	!
*/
```

要初始化一個新的 String 變數或常數，可以直接用雙引號( `"` ) 作為初始值，透過型別推論定義為 String，另外一種方式可以使用 `String()` 作為初始值，效果是一樣的。

```swift
let exampleString = ""
let initializeString = String()
```

從 Swift 官方 API `Swift > String` 找到，底下提供了一個 public 變數 **isEmpty**，可以用來確認字串是否是空字串。

![swift_string_isEmpty.png](@assets/20200822/swift_string_isEmpty.png "Swift property: isEmpty")

```swift
if exampleString.isEmpty && initializeString.isEmpty {
	print("空字串")
}

// Prints: 空字串
```

### String Mutability

針對 String 變數，你可以透過 `+` 或是 `+=` 的方式來連接不同字串，修改變數的值，但是如果用這種方式修改常數，編譯的時候就會出錯。

當然，Character 不允許這樣的方式修改，因為 Character 只能接受一個字元。

```swift
var mutableString = "一天一頻果"
mutableString = mutableString + "荷包的錢遠離我"

var periodCharacter = "."
mutableString += periodCharacter
print(mutableString)
```

```swift
let constantString = "一天一頻果"
constantString += ""
// Warning: Left side of mutating operator isn't mutable: 'constantString' is a 'let' constant
```

甚至是使用 `append()` 的方法去連接 **String** 或是 **Character**

```swift
var message = "一天一蘋果，"
message.append("荷包的錢遠離我")
print(message) //  一天一蘋果，荷包的錢遠離我
```

### String Interpolation

字串表達還有另一種方式，允許在前後雙引號中建構新的字串，使用 `\( )` 的方式，在括弧內就像一般在寫 Swift 語言一樣，允許帶入變數常數，甚至是對其進行運算，最後會最後會轉換成 String。

```swift
let three = 3
let result = "3 * 3 = \(three * 3)"
print(result) // 3 * 3 = 9
```

### 冷知識

- 如果你想把 `"3 * 3 = \(three * 3)"` 像這種 String Interpolation 用字串表達出來，可以在前後雙引號多加一個 `#`。

    ```swift
    let three = 3
    let result = #"3 * 3 = \(three * 3)"#
    print(result) // 3 * 3 = \(three * 3)
    ```

- 承上題，如果我想用這種方式使用 String Interpolation 可以嗎？答案是可以的。先前提到 String Interpolation 的使用方式是 `\( )`，只要再多一個 `#` ，變成 `\#( )` 就可以使用了。

    ```swift
    let three = 3
    let result = #"3 * 3 = \#(three * 3)"#
    print(result) // 3 * 3 = 9
    ```

- 在 `\( )`，括弧內不允許使用像是 `\`、`\n` 或是 `\t` 這種特殊字串

    ```swift
    let three = 3
    let result = #"3 * 3 = \#(three * 3 \t)"# // Warning: Invalid component of Swift key path
    ```

## Counting Characters

一樣地可以從 Swift 官方 API  `Swift > String` 看到，有一個 public 變數 **count**，可以回傳字串的 character 數量。

![swift string count](@assets/20200822/Swift_string_count.png "Swift property: count")

```swift
let message = "猜猜看我總共有幾個字啊？"
print("字數總共有： \(message.count) 個字")  // 字數總共有： 12 個字
```

還記得開頭提到的 Grapheme Cluster，即使看起來好像用了很多字，但是轉換出來他終究還是一個字 `à` 。

```swift
let graphemeCluster = "\u{0061}\u{0300}"  // à
print(graphemeCluster.count) // 1
```

奇怪，明明 Code Points 有兩個，但是為什麼 count 數量只有一個呢？承如上面所說，針對這種 Grapheme Cluster 要得到實際 character 數量前，必須先走訪完所有 Code Points，才能得知 Character 數量，也因此 Counting String 的 Time Complexity 是 $O(n)$，所以如果要使用 count 去計算一個很長的 String，可能其中又夾雜了幾個特殊符號，這時候就要注意 counting 的時間會稍微久一些。

## String Index

上面有提到，在一個 String 中，會有多個 characters，而這每一個 character 又對應到一個 Unicode scalar，必須走訪完整個 String 才能知道每一個 character 的位置在哪裡，所以 Swift 的 String 沒辦法直接使用整數值的索引取得 character。

Swift 也提供了幾個屬性來允許 String 找到特定的 character：

- `startIndex`：回傳 String 中第一個 character 的位置
- `endIndex`：回傳 String 中最後一個 character 後的位置 （注意，不是最後一個，是**最後一個後**）

```swift
let exampleString = "ABCDE"
exampleString[exampleString.startIndex]  // A
exampleString[exampleString.endIndex]  // Fatal error: String index is out of bounds
```

但是這樣要如何取得 String 中最後一個 character？

Swift 還提供了幾個方法可以解決這類的問題：

- `String.index(before:)`：找出某個 index 前一個的 index
- `String.index(after:)`：找出某個 index 後一個的 index

```swift
exampleString[exampleString.index(before: exampleString.endIndex)]  // E
exampleString[exampleString.index(after: exampleString.startIndex)]  // B
```

同理，如果以 endIndex 作為基準點去使用 `String.index(after:)` 方法，因為後面也找不到值了，就會發生 Fatal Error。

```swift
exampleString[exampleString.index(after: exampleString.endIndex)]  // Fatal error: String index is out of bounds
```

甚至你可以直接~~放大招~~使用 `index(_:offsetBy:)` 方法，從特定的位置，往前或往後找尋目標 index。

```swift
exampleString[exampleString.index(exampleString.endIndex, offsetBy: -1)]  // E
exampleString[exampleString.index(exampleString.startIndex, offsetBy: 3)]  // D
```

也因為 String 使用 Collection Protocol，也可以使用 `for ... in String.indices` 去走訪每個 character index。

```swift
for index in exampleString.indices {
    print(exampleString[index])
}

/*
	Prints:
	A
	B
	C
	D
	E
*/
```

## String Modification

### Insert

你可以使用 `String.insert(_:at:)` 插入一個 character 到字串的某個特定的位置。

```swift
var message = "你好"
message.insert("。", at: message.endIndex)  // 你好。

```

如果你想插入字串，就必須使用另外一個方法：

- `String.insert(contentsOf:at:)`：**contentsOf** 帶入你想插入的字串

    ```swift
    var message = "你好"
    message.insert(contentsOf: " 小明。", at: message.endIndex)  // 你好 小明
    ```

### Remove

Swift String 提供了兩個 remove 的方法，來移除特定位置的 character 或是字串：

- `String.remove(_:at:)`：移除某一個位置的 character。
- `String.removeSubrange(_:)`：移除某一段的字元或字串。

```swift
var message = "ABCDE"
message.remove(at: message.index(before: message.endIndex))  // message is ABCD.
message.removeSubrange(message.startIndex..<message.index(message.startIndex, offsetBy: 3))  // message is D.
```

### Substrings

你可以擷取某一段 String 作為 SubString

```swift
var message = "ABCDE"
let subString = message[message.index(message.startIndex, offsetBy: 2)..<message.endIndex]  // CDE
```

但是仔細去看會發現 subString 的型別不是 String 而是 Substring，其實這兩個長得很像，都使用了 StringProtocol，差別就在於 Substrings 使用上會比 String 來得快而且更有效率，為什麼會這樣？

當你從一個 String 切出一個 Substrings 時，不會進行 [Copy-on-write](https://zh.wikipedia.org/zh-tw/%E5%AF%AB%E5%85%A5%E6%99%82%E8%A4%87%E8%A3%BD)，Substrings 共享了 String 原本的 Storage，這也讓 Substring 的使用效率提高。

但是這有個小缺點就是，因為 Substring 與 String 共享同一個 Storage，即時沒有任何引用呼叫，只要 Substring 還存在著，系統就必須保留整個 String，所以有可能造成長時間佔用記憶體資源，最終導致 memory leak，所以在使用上要注意，可以轉換為一個新的 String，這樣就會回收保存舊的 String 的 memory。

---

- 上一篇: <router-link to="/tw/2020/08/18/assertions-and-preconditions/">[一起來看 Swift 官方文件] - Assertions and Preconditions</router-link>