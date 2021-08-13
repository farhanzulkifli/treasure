import React, { CSSProperties, useState, useReducer } from "react";

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

export default function Tweets() {
  const [font, dispatch] = useReducer(reducer, normal);

  return (
    <>
      <div className="tweetContainer">
        <div>
          (Img) <span>John Doe</span>
        </div>
        <p>Testing tweet</p>
        <hr />
        <button>Like</button>
        <button>Share</button>
      </div>
      <form>
        <div className="tweetPost">
          <textarea
            className="textBox"
            placeholder="Tweet Here"
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
