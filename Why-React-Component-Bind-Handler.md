## Why-React-Component-Bind-Handler

`Reference is not Assigned.`

리액트 컴포넌트를 작성할때 흔히 `constructor` 내부에서 핸들러 메소드를 `bind()`하는 경우가 있는데 그 이유를 살펴보도록 한다.

먼저 다음과 같은 리액트 컴포넌트를 상속받은 메소드가 있다고 가정하고 그 인스턴스를 `myObj`라고 가정하자.

```javascript

# Example myObj class
class myObj extends React.Component{

    constructor(props){
        super(props)
        ...
    }
    
    alertHi(){
        console.log(`Hi ${this.props.a}`)    
    }
    
}

# Example myObj instance
let myObj = {
    props : {
        a : 'A',
        b : 'B',
        c : 'C'
    },
    alertHi(){
        console.log(`Hi ${this.props.a}`)
    }
}

myObj.alertHi() => `Hi A`
    

```

`this`는 자신을 의미하므로 자신의 `props` 또한 참조 할 수 있다 다음의 경우에는 자신이 아닌 외부 메소드에서 myObj의 메소드를
사용하려 하는 경우이다.

```javascript

let myObj = {
    props : {
        a : 'A',
        b : 'B',
        c : 'C'
    },
    alertHi(){
        console.log(`Hi ${this.props.a}`)
    }
}

myObj.alertHi()

let myFunc = myObj.alertHi
myFunc() 

```

이전 코드의 출력결과와는 다르게 오류를 뿜는다.

```Bash

console.log(`Hi ${this.props.a}`)
                             ^                       
TypeError: Cannot read property 'a' of undefined

```

외부 메소드는 `myFunc`는 `myObj` 객체 인스턴스의 `alertHi()`의 동작 로직을 이어받았지만
this가 가리키는 대상이 누구인지는 파악을 못하고 있다. 따라서 외부 메소드에 할당시에는 `bind()` 함수를 통해
this가 가리키는 대상이 무엇인지 알려줄 필요가 있다.

```javascript

let myObj = {
    props : {
        a : 'A',
        b : 'B',
        c : 'C'
    },
    alertHi(){
        console.log(`Hi ${this.props.a}`)
    }
}

let myFunc = myObj.alertHi.bind(myObj)
myFunc() => `Hi A`

```

다음의 코드로 좀더 구체화 해보도록 하자. `bind(arg)`의 인자는 할당한 메소드의 `this` 키워드의 타겟을 지정한다.

```javascript


let myObj = {
    props : {
        a : 'A',
        b : 'B',
        c : 'C'
    },
    alertHi(){
        console.log(`나는 원래 myObj의 메소드`)
        console.log(`Hi ${this.props.a}`)
        console.log(`Hi ${this.props.d}`)
    }
}


let myObj2 = {
    props : {
        a : 'D',
        b : 'E',
        c : 'F',
        d : 'React'
    },
    alertHi(){
        console.log(`Hi ${this.props.a}`)
    }
}

let myFunc = myObj.alertHi.bind(myObj2)
myFunc()

// output : 
// 나는 원래 myObj의 메소드
// Hi D
// Hi React

```

### 참고문헌

- [React Binding](https://medium.com/@khwsc1/react%EC%97%90%EC%84%9C%EC%9D%98-%EB%B0%94%EC%9D%B8%EB%94%A9-binding-%EB%B0%A9%EB%B2%95%EB%93%A4-a595ff9190b6)
- [JS call(), apply(), bind()](https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd)
