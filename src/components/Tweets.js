import React, {useState, useReducer, useEffect } from "react";
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

export default function Tweets() {
  const [font, dispatch] = useReducer(reducer, normal);
  const [user, setUser] = useState([]);
  const [tweets, setTweets] = useState([])

useEffect(() => {
    axios.get(`${url}/tweets/`, {
      params: {
        limit: 1
      },
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      },
    }
    )
    .then(function (res){
        console.log(res)
        setTweets((res.data).reverse())
    })
    .catch(function(err){
        console.log(err)
    })
    .then(function(){
    })
  },[])

//   useEffect(() => {
//     axios.post(`${url}/user/`, {
//       headers: {
//         Authorization: localStorage.getItem("access_token")
//           ? "Bearer " + localStorage.getItem("access_token")
//           : null,
//       },
//     }
//     )
//     .then(function (res){
//         console.log(res)
//         setUser(res.data)
//     })
//     .catch(function(err){
//         console.log(err)
//     })
//     .then(function(){
//     })
//   },[])
    
// console.log(tweets)

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

  let onSubmit = (e) => {
    e.preventDefault();
  //     useEffect(() => {
  //   axios.post(`${url}/user/`, {
  //     headers: {
  //       Authorization: localStorage.getItem("access_token")
  //         ? "Bearer " + localStorage.getItem("access_token")
  //         : null,
  //     },

  //   }
  //   )
  //   .then(function (res){
  //       console.log(res)
  //       setUser(res.data)
  //   })
  //   .catch(function(err){
  //       console.log(err)
  //   })
  //   .then(function(){
  //   })
  // },[])
console.log(new Date())
console.log(tweets)

  };

  const messages = tweets.map((data, index) => {
    return (
      <div className="tweetContainer" key={index}>
        <div>
        <img className="tweetPic"
        src="https://img.icons8.com/ios-filled/50/000000/indiana-jones.png"
            /> 
        <span style={bold}>{data.author.username}</span>
        </div>
        <br/>
        <div className="tweetMessage">{data.message}</div>
        <button>Like</button>
      </div>
    );
  });


  return (
    <div className="container">
      <form handleSubmit={onSubmit}>
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
      <div className="board">{messages}</div>
      </div>
  );
}