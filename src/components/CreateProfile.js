import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

function CreateProfile() {
  require("dotenv").config();

  const url = process.env.REACT_APP_BASE_URL;

  //   const [isConfirmPwdSame, setIsConfirmPwdSame] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [valid, setValid] = useState(false);

  const handleCreateProfile = (event) => {
    event.preventDefault();
    axios
      .post(`${url}/profile/`, {
        nickname: event.target.nickname.value,
        address: event.target.address.value,
        age: event.target.age.value,
        about_me: event.target.about_me.value,
      },
      {headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      }},
      )
      .then(function (res) {
        console.log(res);
        if (res.status === 200) {
          setIsSuccess(true);
        }
      })
      .catch(function (err) {
        console.log(err);
        setValid(true);
      });
  };

  return (
    <>
      <div className="SignUpForm">
        <h1 style={{ color: "#17252A" }}>Create Profile</h1>
        <form onSubmit={handleCreateProfile}>
          <div className="user-box">
            <input type="text" name="nickname" required />
            <label>Nickname</label>
          </div>
          <div className="user-box">
            <input type="text" name="address" required />
            <label>Address</label>
          </div>
          <div className="user-box">
            <input type="text" name="age" required />
            <label>Age</label>
          </div>
          <div className="user-box">
            <input type="text" name="about_me" required />
            <label>About Me</label>
          </div>
          <button className="btstyle">Go</button>
        </form>
        {isSuccess && <Redirect to="/home/dashboard" />}
      </div>
    </>
  );
}

export default CreateProfile;
