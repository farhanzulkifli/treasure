import React, { useState, useReducer, useEffect } from "react";
import axios from "axios"
require('dotenv').config()

const url = process.env.REACT_APP_BASE_URL

const italic = {
    fontStyle: "italic",
  };
  
  const bold = {
    fontWeight: "bold",
  };
  
  const underline = {
    textDecoration: "underline",
  };
  
  const normal = {
    fontStyle: "normal",
  };
  

function reducer(state, action) {
  switch (action.type) {
    case "bold":
      return (state = bold);
    case "italic":
      return (state = italic);
    case "underline":
      return (state = underline);
    default:
      return (state = normal);
  }
}

export default function Messages(prop) {
  const [font, dispatch] = useReducer(reducer, normal);
  const [chat, setChat] = useState([]);

useEffect(()=> {
    axios
      .get(`${url}/messages/${prop.data.id}`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        }
      })
      .then(function (res) {
        console.log(res);
      setChat(res.data)      
    })
      .catch(function (err) {
        console.log(err);
      });
},[prop])

  let handleSubmit = (e) => {
    e.preventDefault();
  };

  const messages = chat.map((data) => {
    return (
      <div className="messageContainer">
        <div>
        <span style={bold}>John Doe</span>
        </div>
        <br/>
        <div>{data.dm}</div>
      </div>
    );
  });

  return (
    <>
    <h1>You are chatting with {prop.data.username}</h1>
      <div className="board">{messages}</div>
      <form onSubmit={handleSubmit}>
        <div className="tweetPost">
          <textarea
            className="textBox"
            placeholder="Message Here"
            // onChange={(e) => setTerm(e.target.value)}
            maxLength={150}
            style={font}
            required
          ></textarea>
          <div className="buttonContainer">
            <button className="submitButton">Submit</button>
          </div>
          <ul className="horizontalList">
            <li
              className="formButton"
              onClick={() => dispatch({ type: "bold" })}
              style={bold}
            >
              B
            </li>
            <li
              className="formButton"
              onClick={() => dispatch({ type: "italic" })}
              style={italic}
            >
              I
            </li>
            <li
              className="formButton"
              onClick={() => dispatch({ type: "underline" })}
              style={underline}
            >
              U
            </li>
          </ul>
        </div>
      </form>
    </>
  );
}
