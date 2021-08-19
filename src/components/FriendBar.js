import React, { useState, useEffect } from "react";
import axios from "axios";
import Messages from "./Messages";

require("dotenv").config();

const url = process.env.REACT_APP_BASE_URL;

export default function FriendBar() {
  const [userData, setUserData] = useState([]);
  const [chat, setChat] = useState("");
  const [users, setUsers] = useState([]);
  const [valid, setValid] = useState(false);
  const [already, setAlready] = useState(false);
  const [success, setSuccess] = useState(false);

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
      .get(`${url}/profile/`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res);
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let hash = event.currentTarget.friend.value
      .toString()
      .split("")
      .indexOf("#");
    let id = event.currentTarget.friend.value.toString().split("");
    let sliced = parseInt(id.slice(hash + 1).join(""));
    console.log(sliced);

    axios
      .post(
        `${url}/inviters/`,
        {
          invitee: sliced,
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
        event.target.friend.value = "";
        setSuccess(!success);
        setAlready(false)
        setValid(false)
        console.log(res.status)
      })
      .catch(function (err) {
        console.log(err);
        // console.log(err.status_code);
        if (err.response.status === 406) {
          setValid(!valid);
          setSuccess(false)
          setAlready(false)
        } else if (err.response.status === 400) {
          setAlready(!already);
          setSuccess(false)
          setValid(false)
        }
      });
  };

  const friendList = userData?.friends?.map((data) => {
    return (
      <h4 className="friendNames" onClick={() => setChat(data)}>
        {data.username}
      </h4>
    );
  });

  const options = users?.map((data) => {
    return (
      <option value={`${data.user_id.username}#${data.user_id.id}`}></option>
    );
  });

  return (
    <>
      {chat ? <Messages data={chat}></Messages> : null}
      <div className="friendBar">
        {success && <h3 style={{ color: "#17252a" }}>Request Sent!</h3>}
        {already && <h3 style={{ color: "red" }}>Already Requested!</h3>}
        {valid && <h3 style={{ color: "red" }}>Already Friends!</h3>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            list="search"
            name="friend"
            className="searchbar"
            placeholder="Search for user"
            autoComplete="off"
          />
          <datalist id="search">{options}</datalist>
          <button className="btstyle">Send Friend Request</button>
        </form>
        <h1>Friend List</h1>
        {friendList}
      </div>
    </>
  );
}
