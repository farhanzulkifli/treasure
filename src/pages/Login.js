import React, {useState} from 'react'
import { useHistory,  } from 'react-router-dom'
import axios from "axios";
require('dotenv').config()

const url = process.env.REACT_APP_BASE_URL
console.log(url)

export default function Login() {

const [userWrong, setUserWrong] = useState(false)
let history = useHistory();

const handleLogin = (event) => {
    event.preventDefault()
    const username = (event.target.username.value).toLowerCase()
    
    axios.post(`${url}/user/login/`, {
        username: username,
        password: event.target.password.value
    })
    .then(function (res) {
        console.log(res)
        localStorage.setItem('access_token', res.data.token)
        localStorage.setItem('refresh_token', res.data.refresh)
        console.log(localStorage)
        history.push("/home/realmap")
    })
    .catch(function (err) {
        console.log(err)
        setUserWrong(true);
      });
}


    return (
        <div className="SignInForm">
            <form onSubmit={handleLogin}>
            <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <button className="btstyle">Login</button>
            </form>
            {userWrong && <h5>Incorrect Username/Password</h5>}
         </div>
    )
}
