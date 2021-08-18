import React from 'react'
import {Route, Switch, useRouteMatch } from 'react-router-dom'
import AboutUs from './AboutUs'
import Dashboard from './Dashboard'
import FriendBar from "./FriendBar"
import RealMap from './RealMap'
import Tweets from './Tweets'
// import TreasureBar from './TreasureBar'

export default function RightContainer() {
    const {path} = useRouteMatch()
    return (
        <div>
        <Switch>
            <Route path = {`${path}/dashboard`} component = {Dashboard}/>
            <Route path = {`${path}/realmap`} component = {RealMap}/>
            <Route path = {`${path}/tweets`} component = {Tweets}/>
            <Route path = {`${path}/messages`} component = {FriendBar}/>
            <Route path = {`${path}/aboutus`} component = {AboutUs}/>
            {/* <Route path = {`${path}/realmap/:treasurename`} component = {TreasureBar}/> */}

        </Switch>
        </div>
    )
}
