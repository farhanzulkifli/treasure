import React from 'react'
import { Link } from 'react-router-dom'
import StaticMap from '../components/StaticMap'
export default function Landing() {
    return (
        <div>
        Landing
        <StaticMap/>
        <Link to = "/login">Login</Link>
        <Link to = "/register">Register</Link>
        </div>
    )
}
