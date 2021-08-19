import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  require("dotenv").config();
  const [userData, setUserData] = useState([]);
  const [invite, setInvite] = useState([]);
  const [sentInvite, setSentInvite] = useState([])
  // const [loading, setLoading] = useState(0);
  const url = process.env.REACT_APP_BASE_URL;
  // console.log(loading)
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
  }, []);
  console.log(userData.friends);
  console.log(invite);

  useEffect(() => {
    axios
      .get(`${url}/inviters/`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res)
        setSentInvite(res.data)
        console.log(sentInvite)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const accept = (props) => {
    axios
      .put(
        `${url}/invitees/${props}/`,
        {
          status: "ACCEPT",
        },
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
              ? "Bearer " + localStorage.getItem("access_token")
              : null,
          },
        }
      )
      .then(function (res) {
        console.log(res);
        // setInvite(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const pushFriend = (props) => {
    axios
      .put(
        `${url}/user-profile/${props}/`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
              ? "Bearer " + localStorage.getItem("access_token")
              : null,
          },
        }
      )
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const reloadinvites = () => {
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
  };

  const reloaduserdata = () => {
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
  };
  const decline = (props) => {
    axios
      .put(
        `${url}/invitees/${props}/`,
        {
          status: "DECLINE",
        },
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
              ? "Bearer " + localStorage.getItem("access_token")
              : null,
          },
        }
      )
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
          style={{ borderRadius: "100px", height: "350px" }}
        ></img>
      </div>
      <div className="center">
        <h1>{userData.user_id?.username}</h1>
        <br/>
        <hr/>
        AKA {userData.nickname}
        <br />
        🎂{userData.age}
        <br />
        🏠{userData.address}
        <br />
        👪 {userData.about_me}
      </div>
      <hr/>
      <div className="dashboard">
      <div className="left">
        <h1>Friend List</h1>
        <ul>
          {userData.friends?.map((item, index) => {
            return <li className="dbfriendNames" key={index}>{item.username}</li>;
          })}
        </ul>

      </div>
      <div className="left">
        <h1>Friend requests rec'd</h1>
        <ul>
          {invite?.map((item) => {
            return item.status === "PENDING" ? (
              <li className="dbfriendNames">
                {item.inviter.username} {" "}
                <button
                  onClick={() => {
                    accept(item.id);
                    pushFriend(item.inviter.id);
                    reloadinvites();
                    reloaduserdata();
                    // setLoading((prevstate)=>prevstate + 1)
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    decline(item.id);
                  }}
                >
                  Decline
                </button>
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div className="left">
        <h1>Friend requests sent</h1>
        <ul>
          {sentInvite?.map((item) => {
            return item.status === "PENDING" ? (
              <li className="dbfriendNames">
                {item.invitee.username}
              </li>
            ) : null;
          })}
        </ul>
      </div>
</div>
    </div>
  );
}
