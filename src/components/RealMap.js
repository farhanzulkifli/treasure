import React from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import { useEffect, useState, useCallback, useRef } from "react";
import treasure from "./treasure.svg";
import compass from "./compass.svg";
import TreasureBar from "./TreasureBar";
import axios from "axios";

//importing libraries
// const libraries = ["places"];

//fake data
// const locations = [
//   {
//     name: "Treasure 1",
//     quiz: "What is the name of blablablabla",
//     mcq1: "Choice 1",
//     mcq2: "Choice 2",
//     mcq3: "Choice 3",
//     hunter: [],
//     answer: "Choice 1",
//     hint: "The treasure is hidden under blablablabla",
//     lat: 1.349591,
//     lng: 103.956787,
//   },
//   {
//     name: "Treasure 2",
//     quiz: "What is the name of blablablabla",
//     mcq1: "Choice 1",
//     mcq2: "Choice 2",
//     mcq3: "Choice 3",
//     hunter: [],
//     answer: "Choice 1",
//     hint: "The treasure is hidden under blablablabla",
//     lat: 1.35248,
//     lng: 103.94461,
//   },
//   {
//     name: "Treasure 3",
//     quiz: "What is the name of blablablabla",
//     mcq1: "Choice 1",
//     mcq2: "Choice 2",
//     mcq3: "Choice 3",
//     hunter: [],
//     answer: "Choice 1",
//     hint: "The treasure is hidden under blablablabla",
//     lat: 1.35626197818541,
//     lng: 103.83535857197133,
//   },
// ];

//map styling
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const MapOptions = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

//rendering map itself
const RealMap = () => {
  require("dotenv").config();
  //setting the state for markers
  //   const [map, setMap] = React.useState(null)
  // const [bool, dispatch] = useReducer(reducer, false);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [zoom] = useState(12);
  const [center] = useState({ lat: 1.3521, lng: 103.8198 });
  // const zoom = useRef(12)
  // const center = useRef({ lat: 1.3521, lng: 103.8198 })

  //calling api for markers
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    axios
      .get(baseUrl + "/treasures/", {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
      })
      .then(function (res) {
        setMarkers(res.data);
        console.log(markers);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    // console.log(map)
  }, []);
  // console.log(markers)

  const panTo = useCallback((lat, lng) => {
    // console.log(mapRef.current)
    mapRef.current.setZoom(15);
    mapRef.current.panTo({ lat: lat, lng: lng });
    // console.log(lat, lng);
  }, []);

  const Locate = ({ panTo }) => {
    return (
      <img
        src={compass}
        alt="compass - find me"
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              console.log(position.coords.longitude);
              console.log(position.coords.latitude);
              panTo(position.coords.latitude, position.coords.longitude);
            },
            () => null
          );
        }}
      ></img>
    );
  };

  //when loaded, processes the map. If loading, writes a loading message. I not loaded, throws an error message.
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    // libraries,
  });

  if (loadError) return "Map loading error";
  if (!isLoaded) return "Loading Map";

  return (
    <div className="wrapper">
      <Locate panTo={panTo}></Locate>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={MapOptions}
        onLoad={onMapLoad}
        onClick={() => {
          setSelected(null);
        }}
      >
        {markers.map((marker) => {
          return (
            <Marker
              // onLoad={onMapLoad}
              key={marker.name}
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              icon={{
                url: treasure,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelected(marker);
                panTo(parseFloat(marker.lat), parseFloat(marker.lng));
              }}
            ></Marker>
          );
        })}
        {selected ? (
          <InfoWindow
            position={{
              lat: parseFloat(selected.lat),
              lng: parseFloat(selected.lng),
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="infoWindow">
              {/* <div> */}
                <h4 style={{ color: "black", textDecoration: "underline" }}>{selected.name}</h4>
                <h2 style={{ color: "red", textAlign:"center"}}>{selected.money}</h2>
              {/* </div> */}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {selected ? <TreasureBar selected={selected}></TreasureBar> : null}
      {/* <Switch>
        <Route path={`${path}/:treasurename`}>
          <TreasureBar />
        </Route>
      </Switch> */}
    </div>
  );
};

export default React.memo(RealMap);
