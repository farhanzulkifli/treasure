import { Marker } from "@react-google-maps/api";
import React from "react";
import { useEffect, useState } from "react";


const TreasureBar = (props) => {
  console.log(props)
  const [markers, setMarkers] = useState([]);
  const [option, setOption] = useState([]);
  const [answerBool, setAnswerBool] = useState("none")
  
  const formSubmit = (e) => {
    e.preventDefault();
    if (option === props.selected.answer) {
       setAnswerBool("correct");
    }
    else(setAnswerBool("incorrect"))
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
            {/* <div>Selected option is : {option}</div> */}
            <button className="btn btn-default" type="submit">
              Submit
            </button>
          </>
        ) : null}
        {answerBool === "correct" ? (
            <div>You are correct!😊  Here is the hint: {props.selected.hint}</div> 
        ) : null}
        {answerBool === "incorrect" ? (
            <div>Wrong! Try again!😞 </div> 
        ) : null}
        {answerBool === "none" ? (
            <div>Pick an option 😇 </div> 
        ) : null}
        {/* <div>Selected option is : {this.state.selectedOption}</div>
        <button className="btn btn-default" type="submit">
          Submit
        </button> */}
      </form>
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
