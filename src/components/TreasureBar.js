import { Marker } from "@react-google-maps/api";
import React from "react";
import { useEffect, useState } from "react";

const locations = [
  {
    name: "Treasure 1",
    quiz: "What is the name of blablablabla",
    mcq1: "Choice 1",
    mcq2: "Choice 2",
    mcq3: "Choice 3",
    hunter: [],
    answer: "Choice 1",
    hint: "The treasure is hidden under blablablabla",
    lat: 1.349591,
    lng: 103.956787,
  },
  {
    name: "Treasure 2",
    quiz: "What is the name of blablablabla",
    mcq1: "Choice 1",
    mcq2: "Choice 2",
    mcq3: "Choice 3",
    hunter: [],
    answer: "Choice 1",
    hint: "The treasure is hidden under blablablabla",
    lat: 1.35248,
    lng: 103.94461,
  },
  {
    name: "Treasure 3",
    quiz: "What is the name of blablablabla",
    mcq1: "Choice 1",
    mcq2: "Choice 2",
    mcq3: "Choice 3",
    hunter: [],
    answer: "Choice 1",
    hint: "The treasure is hidden under blablablabla",
    lat: 1.35626197818541,
    lng: 103.83535857197133,
  },
];

const TreasureBar = (props) => {
  const [markers, setMarkers] = useState([]);
  const [option, setOption] = useState([]);

  let bool;

  //   onChangeHandler = (e) =>{

  //   }
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(option);
  };

  useEffect(() => {
    setMarkers(locations);
  }, []);

  return (
    <div className="treasurebar">
      <ul>
        <li>Name: {props.selected.name}</li>
        <li>This is the quiz : {props.selected.quiz}</li>
      </ul>
      <br/>

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
        <br/>

        {option ? (
          <>
            <div>Selected option is : {option}</div>
            <button className="btn btn-default" type="submit">
              Submit
            </button>
          </>
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
