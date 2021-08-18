import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  require("dotenv").config();
  const [userData, setUserData] = useState([]);
  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(`${url}/user-profile/`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res);
        setUserData(res.data[0]);
        console.log(userData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  // return(
  //   <div></div>
  // )
  return (
    <div>
      <div className="center">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/indiana-jones.png"
          alt=""
        ></img>
      </div>
      <div className="center">
        Username: {userData.user_id?.username}
        <br />
        Nickname: {userData.nickname}
        <br />
        Age: {userData.age}
        <br />
        Address: {userData.address}
        <br />
        About Me: {userData.about_me}
      </div>
      <div className="center">
        Friends:
        <ul>
          {userData.friends?.map((item) => {
            return <li>{item.username}</li>
          })}
        </ul>
      </div>
    </div>
  );
}
