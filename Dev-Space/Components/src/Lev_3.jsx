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

