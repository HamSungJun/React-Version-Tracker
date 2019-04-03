import React from 'react'
import ReactDOM from 'react-dom'

class Root extends React.Component{

    constructor(){
        super()

        if ( AUTHOR === `HSJPRIME`){
            console.log(`Made By HSJPRIME`)
        }

    }

    render() {

        return (

            <div>
                <h1>{`Hellooo` + AUTHOR}</h1>
            </div>

        )

    }

}

ReactDOM.render(<Root /> , document.getElementById('root'))
