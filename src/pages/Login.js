import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";

const url = "https://quiet-taiga-82025.herokuapp.com";

export default function Login() {
let history = useHistory();

const handleLogin = (event) => {
    event.preventDefault()
    const username = (event.target.username.value).toLowerCase()
    
    axios.post(`${url}/user/login/`, {
        username: username,
        password: event.target.password.value
    })
    .then(function (res) {
        localStorage.setItem('access_token', res.data.token)
        localStorage.setItem('refresh_token', res.data.refresh)
        console.log(localStorage)
        history.push("/home/realmap")
    })
    .catch(function (err) {
        console.log(err);
      });
}


    return (
        <div className="SignUpForm">
            <form onSubmit={handleLogin}>
            <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <button>Submit</button>
            </form>
             <Link to = "/home/realmap">After Logging in,</Link>
        </div>
    )
}
