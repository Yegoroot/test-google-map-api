import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddPerson from './AddPerson'
import List from './List'


export default () => (

    <Switch>
        <Route path="/" exact component={AddPerson} />
        {/* <Route path="/add" component={AddPerson} /> */}
        <Route path="/list" component={List} />
    </Switch>
)




