import React, { useState, useEffect } from "react";
import axios from "axios";
import Messages from "./Messages";

require("dotenv").config();

const url = process.env.REACT_APP_BASE_URL;

export default function FriendBar() {
  const [userData, setUserData] = useState([]);
  const [chat, setChat] = useState("");
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState()

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
        console.log(res)
        console.log(res.data)
        setUsers(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

<<<<<<< HEAD


const friendList = userData?.friends?.map((data) =>{
    return <h4 onClick={()=>setChat(data)}>{data.username}</h4>
=======
  const handleSubmit = (event) => {
    event.preventDefault()
    let hash = event.currentTarget.friend.value.toString().split('').indexOf('#')
    let id = event.currentTarget.friend.value.toString().split("")
    let sliced = parseInt(id.slice(hash+1).join(''))
    console.log(sliced)

    axios
    .post(`${url}/inviters/`, {
     invitee:sliced
      },
        {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      }
      
    })
    .then(function (res) {
      console.log(res)
      event.target.friend.value = ""
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  const friendList = userData?.friends?.map((data) => {
    return <h4 onClick={() => setChat(data)}>{data.username}</h4>;
  });

  const options = users?.map((data) => {
    return (
    <option value={`${data.user_id.username}#${data.user_id.id}`}></option>
    )
>>>>>>> c2a7d6f62298e44fd9c745058df3b5508ffe7acc
  })


  return (
    <>

      {chat ? <Messages data={chat}></Messages> : null}
      <div className="friendBar">
      <form onSubmit={handleSubmit}>
      <input type="text" list="search" name="friend" className="searchbar" placeholder="Search for user"/>
      <datalist id="search">
        {options}
      </datalist>
      <button>Send Friend Request</button>
      </form>
      <h1>Friend List</h1>
      {friendList}
      </div>
    </>
  );
}
