import React, {useState, useEffect} from "react";
import axios from "axios"

require('dotenv').config()
const url = process.env.REACT_APP_BASE_URL

export default function Dashboard() {
    useEffect(() => {
        axios
        .get(`${url}/profile/`, {
          headers: {
            Authorization: localStorage.getItem("access_token")
              ? "Bearer " + localStorage.getItem("access_token")
              : null,
          }
        })
        .then(function (res) {
          console.log(res);

        })
        .catch(function (err) {
          console.log(err);
        })
      },[])

    return (
        <div>
            DASHBOARD
        </div>
    )
}
