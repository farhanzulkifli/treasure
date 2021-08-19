// import axios from 'axios'
// import { useEffect, useState } from 'react'
// export default function StaticMap() {
//     require('dotenv').config()
//     const key = process.env.REACT_APP_API_KEY
//     const [markers, setMarkers] = useState([])

// //     const markers = [
// //         {
// //             name: "treasure 1",
// //             lat: 1.349591,
// //             long: 103.956787
// //         },
// //         {
// //             name:"treasure 2",
// //             lat: 1.352480,
// //             long: 103.94461
// //         },
// //         {
// //             name:"treasure 3",
// //             lat: 1.35626197818541,
// //             long: 103.83535857197133
// //         }
// // ]

// useEffect(() => {
//     const baseUrl = process.env.REACT_APP_BASE_URL
//     axios
//       .get(baseUrl+"/treasures/"
//     //   , {
//     //     headers: {
//     //       Authorization: localStorage.getItem("access_token")
//     //         ? "Bearer " + localStorage.getItem("access_token")
//     //         : null,
//     //     },
//     //   }
//       )
//       .then(function (res) {
//         setMarkers(res.data);
//         console.log(markers)
//       })
//       .catch(function (err) {
//         console.log(err);
//       })
//   }, []);

// let url = ""
// for(const i of markers){
// console.log(i)
// url += `%7C${parseFloat(i.lat)},${parseFloat(i.lng)}`
// }
// console.log(url)
// return (
//     <div className = "center">
//         <img src={`https://maps.googleapis.com/maps/api/staticmap?center=Singapore&zoom=11&size=600x380&maptype=roadmap&scale=2&map_id=53c641c1d183e837&key=${key}&markers=color:white%7Csize:tiny${url}`} alt="Nothing to see here" />
//     </div>
// )
// }

import React from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import diamonds from "./diamonds.svg";
import MapStyles2 from "./MapStyles2";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};
const MapOptions = {
  styles: MapStyles2,
  disableDefaultUI: true,
  zoomControlOptions: false,
  scrollwheel:false
};

function StaticMap() {
  require("dotenv").config();
  const [markers, setMarkers] = useState([]);
  // const [selected, setSelected] = useState(null);

  const [zoom] = useState(12);
  const [center] = useState({ lat: 1.3521, lng: 103.8198 });

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
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    // libraries,
  });

  if (loadError) return "Map loading error";
  if (!isLoaded) return "Loading Map";

  return (
    
    <div className="wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={MapOptions}
        onLoad={onMapLoad}
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
                url: diamonds,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            ></Marker>
          );
        })}
      </GoogleMap>
      <div className = "active">
        Active Treasures: {markers.length}
      </div>
    </div>
  );
}

export default StaticMap;
