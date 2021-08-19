import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  require("dotenv").config();
  const [userData, setUserData] = useState([]);
  const [invite, setInvite] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, [loading]);

  useEffect(() => {
    axios
      .get(`${url}/invitees/`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res);
        setInvite(res.data);
        console.log(invite);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [loading]);
  console.log(userData.friends);
  console.log(invite);

  const accept = (props) => {
    axios
    .put(`${url}/invitees/${props}/`,
    {
      status: "ACCEPT",
    },
    {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      },
    })
    .then(function (res) {
      console.log(res)
      // setInvite(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
  };
  
  const pushFriend = (props) => {
    axios
    .put(`${url}/user-profile/${props}/`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      },
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  const decline = (props) => {
    axios
    .put(`${url}/invitees/${props}/`,
    {
      status: "DECLINE",
    },
    {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      },
    })
    .then(function (res) {
      console.log(res);
      setInvite(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  return (
    <div>
      <div className="center">
        <img
          src={userData.image_src}
          alt="Profile Pic"
        style = {{borderRadius: "100px", height:"150px"}}></img>
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
          {userData.friends?.map((item, index) => {
            return <li key={index}>{item.username}</li>;
          })}
        </ul>
      </div>
      <div className="center">
        Friend Requests:
        <ul>
          {invite?.map((item) => {
            return (
              item.status === "PENDING" ? 
              <li>
                {item.inviter.username} {item.status}{" "}
                <button
                  onClick={(() => {
                    accept(item.id)
                    pushFriend(item.inviter.id)
                    setLoading(!loading)
                  })}
                >
                  Accept
                </button>
                <button
                  onClick={(() => {
                    decline(item.id)
                    setLoading(!loading)
                  })}
                >
                  Decline
                </button>
              </li>
                :null
            );
          })}
        </ul>
      </div>
    </div>
  );
}
