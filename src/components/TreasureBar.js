import React from "react";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import axios from "axios";

const TreasureBar = (props) => {
  // const [found, setFound] = useState([]);
  const [option, setOption] = useState([]);
  const [answerBool, setAnswerBool] = useState("");
  console.log(props);
  console.log(localStorage);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  useEffect(() => {
    axios
      .get(baseUrl + "/treasures/participated/", {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        console.log(res);
        // console.log(markers)
        const found = res.data;
        console.log(found);
        const checkName = (obj) => obj.name === props.selected.name;
        if (found.some(checkName) === true) {
          setAnswerBool("correct");
        } else setAnswerBool("none");
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [props.selected.name]);

  const formSubmit = (e) => {
    e.preventDefault();
    if (option === props.selected.answer) {
      setAnswerBool("correct");
      const baseUrl = process.env.REACT_APP_BASE_URL;

      axios
        .put(
          baseUrl + "/treasure/" + props.selected.name,
          {},
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
        })
        .catch(function (err) {
          console.log(err);
        });
    } else setAnswerBool("incorrect");
  };

  const options = props.selected.hunters?.map((data) => {
    return (
    <option value={`${data.username}#${data.id}`}></option>
    )
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    let hash = event.currentTarget.friend.value.toString().split('').indexOf('#')
    let id = event.currentTarget.friend.value.toString().split("")
    let sliced = parseInt(id.slice(hash+1).join(''))
    console.log(sliced)

    axios
    .post(`${baseUrl}/inviters/`, {
     invitee:sliced
      },
        {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      }
      
    })
    .then(function (res) {
      console.log(res)
      event.target.friend.value = ""
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  return (
    <div className="treasurebar">
      <ul>
        <li>Name: {props.selected.name}</li>
        <li>This is the quiz : {props.selected.quiz}</li>
      </ul>
      <br />

      <form onSubmit={formSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={props.selected.mcq1}
              onChange={(e) => {
                setOption(e.target.value);
              }}
              checked={option === props.selected.mcq1}
            />
            {props.selected.mcq1}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={props.selected.mcq2}
              onChange={(e) => {
                setOption(e.target.value);
              }}
              checked={option === props.selected.mcq2}
            />
            {props.selected.mcq2}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={props.selected.mcq3}
              onChange={(e) => {
                setOption(e.target.value);
              }}
              checked={option === props.selected.mcq3}
            />
            {props.selected.mcq3}
          </label>
        </div>
        <br />

        {option ? (
          <>
            <button className="btn btn-default" type="submit">
              Submit
            </button>
            <br />
          </>
        ) : null}
        <br />
        {answerBool === "correct" ? (
          <div>You are correct!😊 Here is the hint: {props.selected.hint}</div>
        ) : null}
        {answerBool === "incorrect" ? <div>Wrong! Try again!😞 </div> : null}
        {answerBool === "none" ? <div>Pick an option 😇 </div> : null}
      </form>

      {answerBool === "correct" ? (
        <div>
          <br />
          Found the Treasure? Upload an Image and a description!
          <br />
          <br />
          <CloudinaryUploadWidget />
        </div>
      ) : null}
      <br></br>
      <form onSubmit={handleSubmit}>
      <input type="text" list="search" name="friend" className="searchbar" placeholder="Search for user"/>
      <br></br>
      <datalist id="search">
        {options}
      </datalist>
      <button>Send Friend Request</button>
      </form>
    </div>
  );
};

export default TreasureBar;
