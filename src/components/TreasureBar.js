import { Marker } from "@react-google-maps/api";
import React from "react";
import { useEffect, useState } from "react";

const locations = [
  {
    name: "Treasure 1",
    quiz: "quiz",
    hint: "hint",
    lat: 1.349591,
    lng: 103.956787,
  },
  {
    name: "Treasure 2",
    quiz: "quiz",
    hint: "hint",
    lat: 1.35248,
    lng: 103.94461,
  },
  {
    name: "Treasure 3",
    quiz: "quiz",
    hint: "hint",
    lat: 1.35626197818541,
    lng: 103.83535857197133,
  },
];

const TreasureBar = (props) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(locations);
  }, []);
  
    return (

    <div>
      Name: {props.selected.name}
      This is the quiz : {props.selected.name}
      Hint: {props.selected.hint}
    </div>)
}
  //   {markers.map((marker) => {
  //     return <div>
  //         Name: {marker.name}
  //         This is the quiz: {marker.quiz}
  //         Hint: {marker.hint}

  //     </div>;
  //   })
  //   )

export default TreasureBar;
