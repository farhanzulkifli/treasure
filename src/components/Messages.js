import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const url = process.env.REACT_APP_BASE_URL;

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
  const [loading, setLoading] = useState(false);
  let element = document.getElementById("board");
  const scroll = () => {
    console.log("works")
    setTimeout(function(){element.scrollTop = element.scrollHeight}, 1000)
    }


  useEffect(() => {
    axios
      .get(`${url}/messages/${prop.data.id}`, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        setChat(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [loading, prop]);

  let handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${url}/messages/${prop.data.id}`,
        {
          dm: event.target.message.value,
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
        event.target.message.value = "";
        setLoading(!loading);
      })
      .catch(function (err) {
        console.log(err);
      });
      scroll()
  };

  const messages = chat.map((data) => {
    return (
      <div className="messageContainer">
        <div>
          <p style={bold}>{data.sender.username}</p>
        </div>
        <br />
        <div>{data.dm}</div>
      </div>
    );
  });

  return (
    <>
      <h1 className="center">{prop.data.username}</h1>
      <div className="board" id="board">
        {messages}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="tweetPost">
          <textarea
            name="message"
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
