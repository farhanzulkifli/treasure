import React from "react";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";


const TreasureBar = (props) => {
  console.log(props);
  const [markers, setMarkers] = useState([]);
  const [option, setOption] = useState([]);
  const [answerBool, setAnswerBool] = useState("none");

  const formSubmit = (e) => {
    e.preventDefault();
    if (option === props.selected.answer) {
      setAnswerBool("correct");
    } else setAnswerBool("incorrect");
  };

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
            <br/>
          </>
        ) : null}
<br/>
        {answerBool === "correct" ? (
          <div>You are correct!😊 Here is the hint: {props.selected.hint}</div>
        ) : null}
        {answerBool === "incorrect" ? <div>Wrong! Try again!😞 </div> : null}
        {answerBool === "none" ? <div>Pick an option 😇 </div>: null}
        </form>
        
        {answerBool === "correct" ? (
        <div>
          <br/>
          Found the Treasure? Upload an Image and a description!
          <br/>
          <br/>
          <CloudinaryUploadWidget/>
        
        </div>): null}
    </div>
  );
};
//   {markers.map((marker) => {
//     return <div>
//         Name: {marker.name}
//         This is the quiz: {marker.quiz}
//         Hint: {marker.hint}

//     </div>;
//   })
//   )

export default TreasureBar;
