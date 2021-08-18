import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
require("dotenv").config();

const url = process.env.REACT_APP_BASE_URL;

export default function Register() {
  const [isConfirmPwdSame, setIsConfirmPwdSame] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [valid, setValid] = useState(false);

  const handleRegisterUser = (event) => {
    event.preventDefault();
    setIsConfirmPwdSame(true);
    setValid(false);
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setIsConfirmPwdSame(false);
      return;
    }

    axios
      .post(`${url}/user/signup/`, {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value,
      })
      .then(function (res) {
        console.log(res);
        axios
          .post(`${url}/user/login/`, {
            username: event.target.username.value,
            password: event.target.password.value,
          })
          .then(function (res) {
            console.log(res)
            if (res.status === 200) {
              setIsSuccess(true);
              console.log(res);
              localStorage.setItem("username", event.target.username.value);
              localStorage.setItem("access_token", res.data.token);
              localStorage.setItem("refresh_token", res.data.refresh);
              // localStorage.setItem('user_id', res.data)
              console.log(localStorage);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
        setValid(true);
      });
  };

  return (
    <>
      <div className="SignUpForm">
        <h1 style={{ color: "#17252A" }}>Sign up</h1>
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
        {!isConfirmPwdSame && <h3>Passwords Must Match</h3>}
        {valid && <h4>Username/Email Taken!</h4>}
        {isSuccess && <Redirect to="/createprofile" />}
      </div>
    </>
  );
}
