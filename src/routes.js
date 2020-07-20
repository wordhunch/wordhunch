import React from "react"
import {Switch, Route} from "react-router-dom"
import Landing from "./components/Landing/Landing"
import Profile from "./components/Profile/Profile"
import Auth from './components/Auth/Auth'
import About from './components/About/About'
import Game from './components/Game/Game'

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/play" component={Game} />
        <Route path="/profile" component={Profile} />
        <Route path="/auth" component={Auth} />
        <Route path="/about" component={About} />
    </Switch>
)