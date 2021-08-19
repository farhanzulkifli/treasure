import React from "react";
import { Link } from "react-router-dom";
import StaticMap from "../components/StaticMap";
// import LoginButtons from './LoginButtons'
export default function Landing() {
  return (
    <div>
      <StaticMap />
        <div>
        <div className = "title">
            Treasures
        </div >
          <Link to="/login" className="login1">
            Login
          </Link>
          <Link to="/register" className="register1" >
            Register
          </Link>
        </div>
    </div>
  );
}
