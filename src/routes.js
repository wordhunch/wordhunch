import React from "react"
import {Switch, Route} from "react-router-dom"
import Landing from "./components/Landing"
import Profile from "./components/Profile"
import Auth from './components/Auth'

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/auth" component={Auth} />
    </Switch>
)