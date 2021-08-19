import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
require('dotenv').config()

export default function NavBar() {
  const [userData, setUserData] = useState([])
  let { url } = useRouteMatch();
  const history = useHistory()
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const logOut = () => {
    localStorage.clear()
    console.log(localStorage)
    history.push("/")
  }

  useEffect(() => {
    axios
      .get(`${baseUrl}/user-profile/`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res);
        setUserData(res.data[0]);
        // console.log(res.data[0])
        // console.log(userData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div className="container2">
      <div className="navBar">
        <div className="ProfilePic">
          <img
            className="pic"
            src={userData.image_src} alt="Profile Pic"
          />
        </div>
        <h1 className="ProfilePic">Hello {localStorage.getItem("username")}!</h1>
        <ul>
          <Link to={`${url}/dashboard`} className="Link">
            <li>
              <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/452/external-dashboard-blogger-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" alt="" />
              Dashboard
            </li>
          </Link>
          <Link to={`${url}/realmap`} className="Link">
            <li>
              <img src="https://img.icons8.com/material-outlined/50/000000/map--v1.png" alt="" />
              Map
            </li>
          </Link>
          <Link to={`${url}/tweets`} className="Link">
            <li>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/stack-of-tweets.png" alt="" />
              Tweets
            </li>
          </Link>
          <Link to={`${url}/messages`} className="Link">
            <li>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/message-group.png" alt="" />
              Messages
            </li>
          </Link>
          <Link to={`${url}/aboutus`} className="Link">
            <li>
              <img src="https://img.icons8.com/ios/50/000000/indiana-jones.png" alt="" />
              About Us
            </li>
          </Link>
          <li onClick={logOut} className="Link">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-left.png" alt="" />
            Log Out
          </li>
        </ul>
      </div>
    </div>

  );
}
