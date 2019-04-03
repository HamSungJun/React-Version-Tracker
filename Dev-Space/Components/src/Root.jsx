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
