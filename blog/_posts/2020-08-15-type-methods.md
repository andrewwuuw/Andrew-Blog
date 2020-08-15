---
title: 型別方法
date: 2020-08-07
tags:
    - iOS
    - Swift
summary: 快速了解 Static function, Class Function 以及 Global Function。
---

# 型別方法 ( Type Method )

- Static functions
- Class functions

> 定義在特定型別的方法，只屬於類別本身，不能被實體調用

---

## Static Functions

```swift
class 食死人 {
    static func 阿瓦達索命咒() {
        print("Avada Kedavra!!!")
    }
}
```

可以使用  `Bird.fly()` 呼叫，但是如果是先實作 Bird 類別，再去呼叫，就會出現警告標語。

```swift
食死人.阿瓦達索命咒()
//Good
```

```swift
let 我是食死人 = 食死人()
我是食死人.阿瓦達索命咒()
//Static member '阿瓦達索命咒' cannot be used on instance of type '食死人'
```

而且 Static Functions 不能被覆寫。

```swift
class 貝拉・雷斯壯: 食死人 {
    override func 阿瓦達索命咒() {
        print("我是壞蛋，Avada Kedavra!!!")
    }
}
//Method does not override any method from its superclass
```

---

## Class Functions

```swift
class 食死人 {
    class func 阿瓦達索命咒() {
        print("Avada Kedavra!!!")
    }
}
```

Class Functions 跟 Static Functions 很像，**差在 Class Functions 允許子類別覆寫父類別的方法**。

這時候 **貝拉・雷斯壯** 就有客製的阿瓦達索命咒了。

```swift
class 貝拉・雷斯壯: 食死人 {
    override class func 阿瓦達索命咒() {
        print("我是壞蛋，Avada Kedavra!!!")
    }
}
```

但是方法一樣只屬於類別本身，不允許實體調用。
