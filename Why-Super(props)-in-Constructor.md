## Why-Super(props)-in-Constructor

- `ES6 Class`

```javascript 1.6

class Person {
    
    constructor(name){
        
        this._name = name
        
    }
    
    sayHello(){
        
        console.log(`Hello! My name is [${this._name}]`)
        
    }
    
}

const SungJun = new Person(`SungJun`)

SungJun.sayHello() => Hello! My name is [SungJun]

```

기본 `Person` 클래스를 선언하고 `sayHello()`메소드를 장착하였다.
이때 `constructor()`는 클래스가 인스턴스화 되는 상황에서 기본적으로 수행되는 루틴이 정의된다.

