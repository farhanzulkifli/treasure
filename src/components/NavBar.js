import React from 'react'
import { Link,useRouteMatch } from "react-router-dom";

export default function NavBar() {
	let { url } = useRouteMatch();
    
    return (
        <div className="container">
        <div className="container2">
        <div className="navBar">
            Nav Bar on the left side
            <div>(IMG)</div>
            <p>Hello User,</p>
            <ul >
            <Link to = {`${url}/dashboard`} className="Link"><li>Dashboard</li></Link>
            <Link to = {`${url}/realmap`} className="Link"><li>Map</li></Link>
            <Link to = {`${url}/tweets`} className="Link"><li>Tweets</li></Link>
            <Link to = {`${url}/messages`} className="Link"><li>Messages</li></Link>
            <Link to = {`${url}/aboutus`} className="Link"><li>About Us</li></Link>
            <Link to = "/" className="Link"><li>Log Out</li></Link>
            </ul>
        </div>
        </div>
        </div>
    )
}
