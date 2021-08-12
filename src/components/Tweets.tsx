import React, { CSSProperties, useState } from "react";

const maxLength = 150;

const italic: CSSProperties = {
  fontStyle: "italic",
};

const bold: CSSProperties = {
    fontWeight: "bold",
  };

const underline: CSSProperties = {
    textDecoration: "underline",
}


export default function Tweets() {
const [boldStyle, setBoldStyle] = useState<CSSProperties>()
const [itaStyle, setItaStyle] = useState<CSSProperties>()
const [ulStyle, setUlStyle] = useState<CSSProperties>()
const [fontStyle, setFontStyle] = useState<CSSProperties>()
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
            style={fontStyle}
            required
          >
              </textarea>
               <div className="buttonContainer"><button className="submitButton">Submit</button></div>
          <ul className="horizontalList">
            <li className="formButton" onClick={() => setFontStyle(bold) } style={bold}>
              B
            </li>
            <li className="formButton" onClick={() => setItaStyle(italic)}style={italic}>
              I
            </li>
            <li className="formButton" onClick={() => setUlStyle(underline)} style={underline}>
              U
            </li>
          </ul>
        </div>
      </form>
    </>
  );
}
