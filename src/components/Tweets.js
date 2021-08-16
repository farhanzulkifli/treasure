import React, {useState, useReducer } from "react";
// import axios from "axios"

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

export default function Tweets() {
  const [font, dispatch] = useReducer(reducer, normal);
  const fakeTweets = ["test", "test2", "test3", "test4"];
  const [term, setTerm] = useState("");


  //   axios.get('insert link here')
  //   .then(function (res: any){
  //       console.log(res)
  //   })
  //   .catch(function(err: any){
  //       console.log(err)
  //   })
  //   .then(function(){
  //   })

  //   axios.post('insert link here',{
  //       userid: 'ID',
  //       params: 'tweets'
  //   })
  //   .then(function (res: any){
  //       console.log(res)
  //   })
  //   .catch(function(err: any){
  //       console.log(err)
  //   })

  let handleSubmit = (e) => {
    e.preventDefault();
    fakeTweets.push(term);
    console.log(fakeTweets);
  };

  const messages = fakeTweets.map((data) => {
    return (
      <div className="tweetContainer">
        <div>
          (Img) <span style={bold}>John Doe</span>
        </div>
        <br/>
        <div>{data}</div>
        <hr />
        <button>Like</button>
        <button>Share</button>
      </div>
    );
  });


  return (
    <div className="container">
      <div className="board">{messages}</div>
      <form>
        <div className="tweetPost">
          <textarea
            className="textBox"
            placeholder="Tweet Here"
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
      </div>
  );
}