## React-Context-API

`What is?`

리액트 컴포넌트 트리구조상에서 일일히 모든 레벨로 `props`를 전달하지 않고 바로 데이터를 전달 할 수 있게 해준다.

`When to Use?`

- 전역 변수로 판단되어지는 데이터를 다루고자 할때. 인증받은 유저 , 테마 , 웹 페이지 랭귀지  
- Redux에 대한 대안이 될지?

`API`

- `React.createContext`
- `Context.Provider`
- `Class.contextType`
- `Context.Consumer`

### Code Example

<hr />

> **상황** : Depth 3 정도의 리액트 컴포넌트 트리구조를 가정한다. Root >> Lev_1 >> Lev_2 >> Lev_3
Root.jsx 컴포넌트는 서버로 부터 **username** , **email** 을 Lev_3 컴포넌트로 전달해야 하는 상황.



```javascript

> Root.jsx

import React from 'react'
import ReactDOM from 'react-dom'

import Lev_1 from './Lev_1.jsx'

import { Provider } from '../../Context/Context.js'

class Root extends React.Component{

    constructor(props){

        super(props)

        this.state = {

            user : {
                email : "",
                username : ""
            }

        }

    }

    componentDidMount() {

        fetch(`https://jsonplaceholder.typicode.com/users?id=1`)
            .then(response => (response.json()))
            .then(Jres => (
                this.setState({
                    user : {
                        email : Jres[0]["email"],
                        username : Jres[0]["username"]
                    }
                })
            ))

    }

    render() {

        return (

            <div>
                <Provider value={this.state} >
                    <Lev_1 />
                </Provider>
            </div>

        )

    }

}

ReactDOM.render(<Root /> , document.getElementById('root'))

```

`Root.jsx`는 리액트 컴포넌트 트리구조의 루트 노드에 해당한다. 여기서 `componentDidMount()` 마운트 단계에서 `fetch()`를 통해 샘플 유저 정보를 내려받을 것이다.

`render()` 메소드를 통해서 바로 아래 Depth인 `Lev_1` 컴포넌트를 렌더링 할 것이며 `Lev_1` 컴포넌트는 `Root`으로 부터 어떤 `Props`도 내려받지 않는다.

미리 작성된 `Context.js` 에서 `Provider`를 임포트한다.

```javascript

> Lev_1.jsx

import React from 'react'

import Lev_2 from './Lev_2.jsx'

class Lev_1 extends React.Component{

    render() {

        return (

            <div>
                <Lev_2 />
            </div>

        )

    }

}

export default Lev_1

```

`Lev_1` 컴포넌트는 `Lev_2`컴포넌트만 임포트하여 렌더링한다.

```javascript

> Lev_2.jsx

import React from 'react'

import { Lev_3 } from './Lev_3.jsx'

class Lev_2 extends React.Component{

    render() {

        return (

            <div>
                {Lev_3}
            </div>

        )

    }

}

export default Lev_2

```

`Lev_2` 컴포넌트는 함수형 컴포넌트로 작성된 `Lev_3`컴포넌트를 렌더링한다.

```javascript

import React from 'react'

import { Consumer } from '../../Context/Context.js'

export const Lev_3 = (

    <Consumer>
        { value => (
            <div>
                <span>{`email : ${value.user.email}`}</span>
                <span>{`username : ${value.user.username}`}</span>
            </div>
        ) }
    </Consumer>

)

```

`Context API`를 활용하기 위해서 `Consumer` 컨텍스트를 이용하는 컴포넌트는 함수형으로 작성한다.

```javascript

> Context.js

import React from 'react'

const { Provider , Consumer } = React.createContext()

export { Provider , Consumer}

```

`Context.js`는 위와 같이 작성하였다.

결론적으로, Root부터 각 레벨 컴포넌트를 거치는 `Prop Drilling` 과정을 거치지 않고 Root에서 Lev_3 컴포넌트로 데이터 전달이 가능하였다.

아주 작은 String , Object에 대한 전역 참조를 하는 용도나 Redux 상태 컨테이너를 구축할 만큼 규모 있는 어플리케이션을 개발하는 상황이 아니라면
활용하는 것도 괜찮아 보인다.

하지만 `Source of Truth`관점을 조금 무너뜨리는 느낌이라 여전히 Redux를 활용 할 것 같다.

