import React, { useState, useReducer } from "react";
import axios from "axios"


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

export default function Messages() {
  const [font, dispatch] = useReducer(reducer, normal);
  const [term, setTerm] = useState("");
  const fakeMessage = ["test", "test2"];

  //   axios
  //     .get("insert link here")
  //     .then(function (res: any) {
  //       console.log(res);
  //     })
  //     .catch(function (err: any) {
  //       console.log(err);
  //     })
  //     .then(function () {});

  //   axios
  //     .post("insert link here", {
  //       userid: "ID",
  //       params: "message here",
  //     })
  //     .then(function (res: any) {
  //       console.log(res);
  //     })
  //     .catch(function (err: any) {
  //       console.log(err);
  //     });

  let handleSubmit = (e) => {
    e.preventDefault();
    fakeMessage.push(term);
    console.log(fakeMessage);
  };

  const messages = fakeMessage.map((data) => {
    return (
      <div className="messageContainer">
        <div>
        <span style={bold}>John Doe</span>
        </div>
        <br/>
        <div>{data}</div>
      </div>
    );
  });

  return (
    <>
      <div className="board">{messages}</div>
      <form onSubmit={handleSubmit}>
        <div className="tweetPost">
          <textarea
            className="textBox"
            placeholder="Message Here"
            onChange={(e) => setTerm(e.target.value)}
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
