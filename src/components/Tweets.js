import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

require("dotenv").config();

console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));

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

export default function Tweets() {
  const [font, dispatch] = useReducer(reducer, normal);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

const FetchData = () => {
  useEffect(() => {
    axios
      .get(`${url}/tweets/`, {
        params: {
          limit: 1,
        },
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res);
        setTweets(res.data.reverse());
      })
      .catch(function (err) {
        console.log(err);
      })
      .then(function () {});
  }, [loading]);
}

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

  let onSubmit = (event) => {
    event.preventDefault();
    console.log(
      localStorage.getItem("access_token")
        ? "Bearer " + localStorage.getItem("access_token")
        : null
    );
    console.log(event.target.message.value);

    axios
      .post(
        `${url}/tweets/`,
        {
          message: event.target.message.value,
          date: new Date(),
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
        setLoading(!loading);
        event.target.message.value = "";
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log(tweets);
  };

  let like = (event) => {
    console.log("clicked");
    console.log(event.currentTarget.value);
    console.log(typeof event.currentTarget.style.cssText);
    event.currentTarget.style.cssText = "color:red";
  };

  const messages = tweets.map((data, index) => {
    return (
      <div className="tweetContainer" key={index}>
        <div>
          <img
            className="tweetPic"
            src="https://img.icons8.com/ios-filled/50/000000/indiana-jones.png"
          />
          <span style={bold}>{data.author.username}</span>
          <span className="right">{moment(data.date).fromNow()}</span>
        </div>
        <br />
        <div className="tweetMessage">{data.message}</div>
        <div className="like" style={{ color: "black" }} onClick={like}>
          ♡
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="tweetPost">
          <textarea
            className="textBox"
            name="message"
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
      <div className="board">
        <InfiniteScroll
          dataLength={messages.length}
          next={FetchData()}
          hasmore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You've seen it all!</b>
            </p>
          }
        >
          {messages}
        </InfiniteScroll>
      </div>
    </div>
  );
}
