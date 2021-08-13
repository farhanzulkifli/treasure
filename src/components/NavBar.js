import React from 'react'
import { Link,useRouteMatch } from "react-router-dom";

export default function NavBar() {
	let { url } = useRouteMatch();
    
    return (
        <div>
            Nav Bar on the left side
            <Link to = {`${url}/dashboard`}>Dashboard</Link>
            <Link to = {`${url}/realmap`}>Map</Link>
            <Link to = {`${url}/tweets`}>Tweets</Link>
            <Link to = {`${url}/messages`}>Messages</Link>
            <Link to = {`${url}/aboutus`}>About Us</Link>
            <Link to = "/">Log Out</Link>
        </div>
    )
}
