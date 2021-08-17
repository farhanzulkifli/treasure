import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from "axios"



export default function Register() {

    const [isConfirmPwdSame, setIsConfirmPwdSame] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [valid, setValid] = useState(false)
    const handleRegisterUser = (event) => {
    event.preventDefault();
    setIsConfirmPwdSame(true);
    setValid(false);
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setIsConfirmPwdSame(false);
      return;
    }
    axios
      .post("insert link here", {
        userid: "ID",
        params: "message here",
      })
      .then(function (res) {
        console.log(res);
        if (res.status === 200) {
            setIsSuccess(true);
        }else if (res.status===409){
            setValid(true)
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    return (
    <>
      <div className="SignUpForm">
        <h1 style={{color:'#17252A'}}>Sign up</h1>
        <form onSubmit={handleRegisterUser}>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password" name="confirmPassword" required />
            <label>Confirm Password</label>
          </div>
          <div className="user-box">
            <input type="text" name="email" required />
            <label>Email Address</label>
          </div>
          <button className="btstyle">Register</button>
        </form>
        {!isConfirmPwdSame && <h3>Confirm Password Must Match</h3>}
        {valid && <h3>Username Taken!</h3>}
        {isSuccess && <Redirect to="/signupsuccess" />}
      </div>
    <Link to = "/home">After Registering,</Link>
    </>
    )
}
