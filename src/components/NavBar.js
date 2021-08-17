import React, {useState} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios"
require('dotenv').config()

const base_url = process.env.REACT_APP_BASE_URL

export default function NavBar() {
  let { url } = useRouteMatch();

console.log(url)


  return (
      <div className="container2">
        <div className="navBar">
          <div className="ProfilePic">
            <img
              className="pic"
              src="https://img.icons8.com/ios-filled/50/000000/indiana-jones.png"
            />
          </div>
          <h1 className="ProfilePic">Hello {localStorage.getItem("username")}!</h1>
          <ul>
            <Link to={`${url}/dashboard`} className="Link">
              <li>
                <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/452/external-dashboard-blogger-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" alt = ""/>
                Dashboard
              </li>
            </Link>
            <Link to={`${url}/realmap`} className="Link">
              <li>
                <img src="https://img.icons8.com/material-outlined/50/000000/map--v1.png" alt = ""/>
                Map
              </li>
            </Link>
            <Link to={`${url}/tweets`} className="Link">
              <li>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/stack-of-tweets.png" alt = ""/>
                Tweets
              </li>
            </Link>
            <Link to={`${url}/messages`} className="Link">
              <li>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/message-group.png" alt = ""/>
                Messages
              </li>
            </Link>
            <Link to={`${url}/aboutus`} className="Link">
              <li>
                <img src="https://img.icons8.com/ios/50/000000/indiana-jones.png" alt = ""/>
                About Us
              </li>
            </Link>
            <Link to="/" className="Link">
              <li>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-left.png" />
                Log Out
              </li>
            </Link>
          </ul>
        </div>
      </div>

  );
}
