import React, {useState} from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
require('dotenv').config()

export default function NavBar() {
  let { url } = useRouteMatch();
  const history = useHistory()

  const logOut = () => {
    localStorage.clear()
    console.log(localStorage)
    history.push("/")
  }

  return (
      <div className="container2">
        <div className="navBar">
          <div className="ProfilePic">
            <img
              className="pic"
              src="https://img.icons8.com/ios-filled/50/000000/indiana-jones.png" alt=""
            />
          </div>
          <h1 className="ProfilePic">Hello {localStorage.getItem("username")}!</h1>
          <ul>
            <Link to={`${url}/dashboard`} className="Link">
              <li>
                <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/452/external-dashboard-blogger-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" alt = ""/>
                 <div>Dashboard</div>
              </li>
            </Link>
            <Link to={`${url}/realmap`} className="Link">
              <li>
                <img src="https://img.icons8.com/material-outlined/50/000000/map--v1.png" alt = ""/>
                 <div>Map</div>
              </li>
            </Link>
            <Link to={`${url}/tweets`} className="Link">
              <li>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/stack-of-tweets.png" alt = ""/>
                 <div>Tweets</div>
              </li>
            </Link>
            <Link to={`${url}/messages`} className="Link">
              <li>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/message-group.png" alt = ""/>
                 <div>Messages</div>
              </li>
            </Link>
            <Link to={`${url}/aboutus`} className="Link">
              <li>
                <img src="https://img.icons8.com/ios/50/000000/indiana-jones.png" alt = ""/>
                 <div>About Us</div>
              </li>
            </Link>
              <li onClick={logOut} className="Link">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-left.png" alt =""/>
                 <div>Log Out</div>
              </li>
          </ul>
        </div>
      </div>

  );
}
