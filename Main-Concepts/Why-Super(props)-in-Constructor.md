## Why-Super(props)-in-Constructor

- `ES6 Class`

```javascript

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
`constroctor()`가 실행되면 빈 Object {}가 생성되고 작성된 클래스의 내용이 할당된다. 이후 `this`로 해당
인스턴스를 참조할 수 있게된다.

이번엔 `AngryPerson` 클래스를 정의하여 부모 클래스 Person을 상속받도록 해보자.

```javascript

class AngryPerson extends Person{
    
    constructor(name){
        super(name)
    }
    
    sayBadWord(){
        console.log('shit!')
    }
    
}

```

이제 부모클래스 `Person` 과 파생 혹은 자식클래스 `AngryPerson` 이 존재한다.
보통 부모클래스에 존재하는 함수를 사용하기 위해서 자식클래스 단에서 `super([...params])`를 호출하게 된다.

```javascript

class Person {

    constructor(name){

        this._name = name

    }

    sayHello(){

        console.log(`Hello! My name is [${this._name}]`)

    }

}

class AngryPerson extends Person{

    constructor(name){
        
        super(name)
        
    }

    getMyName(){
        
        console.log(this._name)
        
    }

    sayBadWord(){
        
        console.log(`shit!`)
        console.log(this)
        
    }

}

const SungJun = new AngryPerson(`SungJun`)
SungJun.sayHello() => Hello My name is [SungJun]
SungJun.sayBadWord() => shit!
SungJun.getMyName() => SungJun

```

실제로 Node.js 런타임을 통해서 `super(props)` 문장을 주석처리후 실행하게 되면 다음과 같은 오류를 낸다.

```bash

    $ node class.js
    
    ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    참조 오류 : this에 접근하거나 자식클래스에서 returning하는 경우에는 반드시 자식클래스에서 super()함수를 호출해야 합니다.
    
```

위의 오류처럼, 자식 클래스에서 `this` 키워드를 이용하기 위해서는 자식 클래스의 `constructor` 내부에서 `super()` 호출이 필수적임을 알 수 있다.
그렇다면 `super()` 호출 없이 상속받아서 부모클래스의 메소드를 이용할 수 있을까?

```javascript

class Person {

    constructor(name){

        this._name = name

    }

    sayHello(){

        console.log(`Hello! My name is [${this._name}]`)

    }

}

class AngryPerson extends Person{

    /*
     *   constructor(name){
     *       //super(name)
     *   }
     *
     *   
    */
    
    getMyName(){
        console.log(this._name) => SungJun
        
    }
    sayBadWord(){
        console.log(`shit! ${this._name}`)
        this.sayHello() => `Hello My name is SungJun`
    }

}


```

이처럼 자식클래스의 `constructor` 부분을 제외하게 되면 자식클래스 인스턴스 생성시 부모클래스의 `constructor`가 호출되고 인자또한 전해진다.

`super` 키워드를 사용해야 하는 경우는 다음과 같다.

- 부모클래스의 `constructor` 함수는 파라미터를 요구하는 상황이고 자식 클래스의 `constructor`에서 이를 전달해 줘야 할때.
- 자식클래스의 `constructor` 함수 내부에서 `this` 키워드를 사용해야하는 상황일때. 단 `super()` 호출은 `this` 문장보다 반드시 선행해야 한다.

## super(props) in react

위 섹션의 내용을 살펴본다면 `super(props)` 내용을 다음의 코드에서 이용하는 경우는 이렇게 추론할 수 있다.

```javascript

    class MyComponent extends React.Component{
    
        constructor(props){
            
            super(props)
            ## constructor 내부에서 this.props로의 접근이 필요한 경우
            ## 다른 컴포넌트 내부 핸들러에서 this.props 접근은 React가 자율적으로 세팅.
            
        }
        
    }

```

### 참고문헌

- Super 키워드(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super)
- React ES6 super(props)(https://medium.com/@umioh1109/react-es6-class-constructor%EC%97%90%EC%84%9C%EC%9D%98-super-9d53ba0611d9)


