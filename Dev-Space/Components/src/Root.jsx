import React , { useState , useEffect } from 'react'
import ReactDOM from 'react-dom'

class Root extends React.Component{

    constructor(props){

        super(props)

    }

    render() {

        return (

            <div>

            </div>

        )

    }

}

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

ReactDOM.render(<Counter /> , document.getElementById('root'))
