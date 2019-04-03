## React-Hooks

`React Hooks`는 클래스 작성없이 `state`와 리액트의 다른 특징들을 이용할 수 있도록 지원한다.

### APIs

1. `useState`

    함수형 컴포넌트는 더이상 `props`만 내려받지 않고 고유의 `state`를 가질 수 있게 되었다.
    
    ```javascript
    
    const Counter = () => {
    
        const [count,setCount] = useState(0)
    
        return (
    
            <div>
                <p>use click {count} times.</p>
                <button onClick={()=>{setCount(count + 1)}}>
                    click me
                </button>
            </div>
    
        )
    
    }
    
    ```

2. `useEffect`

    `useEffect` API를 통해서 자신의 props and state에 접근 할 수 있게 된다. 모든 렌더링 타이밍 후에 리액트는 `useEffect()`를 실행한다.
    
    ```javascript
    
    const Counter = () => {
    
        const [count,setCount] = useState(0)
    
        useEffect(()=>{
            document.title = `You Clicked ${count} Times.`
        })
    
        return (
    
            <div>
                <p>use click {count} times.</p>
                <button onClick={()=>{setCount(count + 1)}}>
                    click me
                </button>
            </div>
    
        )
    
    }

    ```

3. `useContext` , `useReducer`

    Redux 연동해서 사용하는게 훨씬 이로울듯 ... 리액트 컴포넌트 단위 프로그래밍상 여러 소스파일로 분기되는데 각 파일마다 컨텍스트 , 리듀서 위치시키면
    오히려 혼란스러울듯 하다.
    
### Rules of Hooks

- 반드시 함수형 리액트 컴포넌트의 최외곽 스코프에서 선언한다.

