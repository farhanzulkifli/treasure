import React, { CSSProperties, useState, useReducer } from "react";
const axios = require("axios").default;

const maxLength = 150;

const italic: CSSProperties = {
  fontStyle: "italic",
};

const bold: CSSProperties = {
  fontWeight: "bold",
};

const underline: CSSProperties = {
  textDecoration: "underline",
};

const normal: CSSProperties = {
  fontStyle: "normal",
};

function reducer(state: any, action: any): any {
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




export default function Messages(this: any) {
  const [font, dispatch] = useReducer(reducer, normal);
  const [term, setTerm] = useState('')
  const fakeMessage:string[] = ["test", "test2"];

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

    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fakeMessage.push(term)
        console.log(fakeMessage)
      };

    const messages = fakeMessage.map((data:string) => {
        return (<div className="tweetContainer">
        <div>
          (Img) <span>John Doe</span>
        </div>
        <div>{data}</div>
        <hr />
        <button>Like</button>
        <button>Share</button>
      </div>)
    })




  return (
    <>
    <div className="board">
        {messages}
    </div>
      <form onSubmit={handleSubmit}>
        <div className="tweetPost">
          <textarea
            className="textBox"
            placeholder="Message Here"
            onChange={(e) => setTerm(e.target.value)}
            maxLength={maxLength}
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
