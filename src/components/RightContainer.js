import React from 'react'
import {Route, Switch, useRouteMatch } from 'react-router-dom'
import AboutUs from './AboutUs'
import Dashboard from './Dashboard'
import Messages from './Messages'
import RealMap from './RealMap'
import Tweets from './Tweets'

export default function RightContainer() {
    const {path} = useRouteMatch()
    return (
        <div>
        <Switch>
            <Route path = {`${path}/dashboard`} component = {Dashboard}/>
            <Route path = {`${path}/realmap`} component = {RealMap}/>
            <Route path = {`${path}/tweets`} component = {Tweets}/>
            <Route path = {`${path}/messages`} component = {Messages}/>
            <Route path = {`${path}/aboutus`} component = {AboutUs}/>
        </Switch>
        </div>
    )
}
