---
title: "Swift 從零開始 - Optionals"
date: 2020-08-16
tags:
    - iOS
    - Swift
    - Swift 從零開始
summary: 對於 Swift Optional 總是一知半解，其實 optional 是 Swift 強大的核心功能之一
---

![Learning Swift - Optionals](@assets/20200816/banner2.jpg)

# Optionals

---

在[基礎篇](https://andrewwuu.com/tw/2020/08/10/the-basics/)有稍微提到，Optionals 是 Swift 一個特別的型別，它允許變數或是常數可以沒有任何值，沒有值並不是**數字零**或是**空字串**，它則是一個 nil 值。

先來看一個字串轉整數的例子：

```swift
let phoneNumber = "7533967"
let intPhoneNumber = Int(phoneNumber)

// intPhoneNumber 是一個 Int? 型別, Why?
```

為什麼型別推論出來會是**可選整數型別**，原因就是字串中可能夾雜著非數字的文字，在 Int 初始化時有可能會失敗。

```swift
let phoneNumber = "7533967 這個電話號碼永遠刺痛我的心"
let intPhoneNumber = Int(phoneNumber)
print(intPhoneNumber)  // 會印出 nil
```

來看一下為什麼會印出 nil，在 Int 官方 API 說明中可以發現，底下有一個 **Initialization**，原來就是透過這個 **Initialization** 來新增一個新的整數數值。

```swift
@inlinable public init?<S>(_ text: S, radix: Int = 10) where S : StringProtocol
```

仔細來看一下這個 **Initialization** 的說明：

![Int Initialization](@assets/20200816/init.png "Swift Int initialization")

可以看到源碼清楚了說明可以被成功轉換的字串規則，他會去依照帶入的 text 以及 radix ( 進制 ) 做轉換。

![soga](@assets/20200816/soga.gif "soga")

以我們上方的例子，我們沒設定 radix 所以預設是 10 進制，**phoneNumber** 又存在著非數字的文字時，回傳的結果就是 **nil**，也因此 **intPhoneNumber** 會被推論為可選的整數型別。

### 宣告 Optional 變數或常數

你可以在任何型別後面加上 `?`，這樣就可以宣告為可選型別。

```swift
var 樂透中獎人姓名: String?
/* 
因為現在沒有指派樂透中獎人姓名，所以樂透中獎人姓名自動指派為 nil
*/
```

你也可以自己指派字串或是 nil 給樂透中獎人姓名。

```swift
樂透中獎人姓名 = "宜蘭人安竹"  // 我就知道我會中樂透
樂透中獎人姓名 = nil  // 醒醒吧你根本不會中樂透
```

這邊要注意的是，nil 只能指派給 Optional 型別的變數或常數，如果只派給非 Optional 變數或是常數，就會跳出錯誤訊息。

```swift
var 身份ID = "每個人都應該要有個身份ID"
identifier = nil
// Warning: 'nil' cannot be assigned to type 'String'

var 小孩姓名: String = nil
// Warning: 'nil' cannot initialize specified type 'String'
```

### 存取 Optional

假定今天我們要使用 Optional 要特別小心，還記得 Optional 可以是無值的情況嗎？如果是 nil 的情況下去呼叫，可能就會發生錯誤。

```swift
var 勁辣雞腿堡: String? = "勁辣雞腿堡"
print("今晚，我想來點" + 勁辣雞腿堡)  // Value of optional type 'String?' must be unwrapped to a value of type 'String'
```

從上面例子可以得知~~今晚沒得吃了~~你正在使用的是 Optional String，你必須得確認這個變數是否有值，我們可以透過接下來的方式來檢查。

- 在使用 Optional 前先檢查是否為 nil，並且在 Optional 後方加上 `!`

    ```swift
    var 勁辣雞腿堡: String? = "勁辣雞腿堡"
    if 勁辣雞腿堡 != nil {
    	print("今晚，我想來點" + 勁辣雞腿堡!)
    }
    ```

    `!` 會強制解開 Optional，這個前提是「我已經知道這個變數或常數一定有值」，否則解開來是 nil，就會發生錯誤。

    這種情況就像是，我以為我吃得到勁辣雞腿堡，可是我吃不到，森氣氣！

    ![angry](@assets/20200816/angry.gif)

    ```swift
    var 勁辣雞腿堡: String? = nil
    print("今晚，我想來點" + 勁辣雞腿堡!)
    // Warning: Fatal error: Unexpectedly found nil while unwrapping an Optional value
    ```

- Swift 提供了 **Optional Binding**，會先檢查 Optional 是否有值，如果有的話就宣告變數或常數來使用

    ```swift
    var 勁辣雞腿堡: String? = nil
    if let 宵夜 = 勁辣雞腿堡 {
    	print("今晚，我想來點" + 宵夜)
    } else {
    	print("剛好可以減肥")
    }
    ```

    上面的程式碼可以解釋成這樣：

    - 如果勁辣雞腿堡有值 ( **勁辣雞腿堡** )，就把值指派給**宵夜**常數，可以直接使用，不需要再加上 `!`，就會印出 `"今晚，我想來點勁辣雞腿堡"`
    - 如果勁辣雞腿堡沒有值，等同於 if 判斷不成立，印出 `"剛好可以減肥"`

        ![cry](@assets/20200816/cry.gif "Swift optional error")

    如果想在 if 判斷成立時，修改**宵夜**的值，可以用 `if var` 宣告為變數

    ```swift
    var 勁辣雞腿堡: String? = "勁辣雞腿堡"
    if var 宵夜 = 勁辣雞腿堡 {
    	宵夜 = "黃金起士炸雞"
    	print("今晚，我想來點" + 宵夜) // 這時候宵夜就已經被替換成 黃金起士炸雞
    } else {
    	print("剛好可以減肥")
    }
    ```

    Optional Binding 也可以一次宣告多個變數或常數

    ```swift
    var 勁辣雞腿堡: String? = "勁辣雞腿堡"
    var 黃金起士炸雞: String? = "黃金起士炸雞"
    if let 第一份宵夜 = 勁辣雞腿堡, let 第二份宵夜 = 黃金起士炸雞 {
    	print("今晚，我想來點 \(第一份宵夜) 以及 \(第二份宵夜)")
    }

    // 印出 > 今晚，我想來點 勁辣雞腿堡 以及 黃金起士炸雞
    ```

    這麼做看似一切都很美好，但有個小小缺點就是宣告的變數或常數只能在 if 判斷式中使用，出了判斷式，這些變數和常數都沒辦法使用了，後面會介紹 **guard statement**，就可以解決這個問題了。

### Implicitly Unwrapped Optionals

還記得之前在宣告 Optional 變數或常數時，都會在型別後面加上 `?` 嗎？

用問號來表達變數或是常數有值又有可能無值，這種表示方法很直覺又清楚，所以在呼叫的時候用驚嘆號來強制解開取值，也是很合理。

但是這樣每呼叫一次就得加一次驚嘆號，其實蠻累的，所以 Swift 提供了一種方式叫做 **Implicitly Unwrapped Optional**，簡單來說就是是「**暗中地解開 Optional**」，可以在一開始宣告 Optional 時，在型別後方加上 `!` ，開宗明義就篤定這個 Optional 一定有值，呼叫的時候就無需加上驚嘆號了。

![mind-blown](@assets/20200816/mind-blown.gif "mplicitly Unwrapped Optional")

```swift
var 勁辣雞腿堡: String! = "勁辣雞腿堡"
print("今晚，我想來點" + 勁辣雞腿堡)
```

但這也有個風險就是**勁辣雞腿堡**的型別說到底，依舊是 Optional，所以它也有可能會是無值，如果是無值，一樣會發生錯誤，所以要使用這種方式之前，要確保變數或常數必須有值，否則還是用上面的方式安全解開取值。

```swift
var 勁辣雞腿堡: String! = nil
print("今晚，我想來點" + 勁辣雞腿堡)
// Warning: Fatal error: Unexpectedly found nil while unwrapping an Optional value
```

---

- 上一篇: <router-link to="/tw/2020/08/16/basic-types/">Swift 從零開始 - Basic Types</router-link>
- 下一篇: <router-link to="/tw/2020/08/18/assertions-and-preconditions/">Swift 從零開始 - Assertions and Preconditions</router-link>