import React, {useState, useEffect} from "react";
import axios from "axios"
import Messages from "./Messages"

require('dotenv').config()

const url = process.env.REACT_APP_BASE_URL

export default function FriendBar() {
const [userData, setUserData] = useState([])
const [chat, setChat] = useState('')

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
    setUserData(res.data[0])
    console.log(userData)
  })
  .catch(function (err) {
    console.log(err);
  })
},[])

const friendList = userData?.friends?.map((data) =>{
    return <h4 onClick={()=>setChat(data)}>{data.username}</h4>
  })


  return (
    <>
      {chat ? <Messages data={chat}></Messages> : null}
    <div className="friendBar">
    <h1>Friend List</h1>
    {friendList}
    </div>
    </>
)
  
}
