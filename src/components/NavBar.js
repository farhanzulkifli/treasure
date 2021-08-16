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
            <ul>
            <li>
            <Link to = {`${url}/dashboard`}>Dashboard</Link>
            </li>
            <li>
            <Link to = {`${url}/realmap`}>Map</Link>
            </li>
            <li>
            <Link to = {`${url}/tweets`}>Tweets</Link>
            </li>
            <li>
            <Link to = {`${url}/messages`}>Messages</Link>
            </li>
            <li>
            <Link to = {`${url}/aboutus`}>About Us</Link>
            </li>
            <li>
            <Link to = "/">Log Out</Link>
            </li>
            </ul>
        </div>
        </div>
        </div>
    )
}
