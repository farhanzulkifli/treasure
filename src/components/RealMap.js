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

//importing libraries
const libraries = ["places"];

//fake data
const locations = [
  {
    name: "Treasure 1",
    lat: 1.349591,
    lng: 103.956787,
  },
  {
    name: "Treasure 2",
    lat: 1.35248,
    lng: 103.94461,
  },
  {
    name: "Treasure 3",
    lat: 1.35626197818541,
    lng: 103.83535857197133,
  },
];

//map styling
const containerStyle = {
  width: "1200px",
  height: "600px",
  margin: "auto",
  marginTop: "50px",
};

const MapOptions = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

//rendering map itself
const RealMap = () => {
  //setting the state for markers
  //   const [map, setMap] = React.useState(null)
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  //   const [zoom, setZoom] = useState(12);
  //   const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 });

  //calling api for markers
  useEffect(() => {
    setMarkers(locations);
    return () => {};
  }, []);
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = (marker) => {
    mapRef.current.setZoom(15);
    mapRef.current.panTo({ lat:marker.lat , lng:marker.lng });
  }

  //when loaded, processes the map. If loading, writes a loading message. I not loaded, throws an error message.
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  if (loadError) return "Map loading error";
  if (!isLoaded) return "Loading Map";

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 1.3521, lng: 103.8198 }}
      zoom={12}
      options={MapOptions}
      onLoad={onMapLoad}
      onClick={() => {
        setSelected(null);
      }}>

      {markers.map((marker) => {
        return (
          <Marker
            onLoad={onMapLoad}
            key={marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: treasure,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() =>{
                setSelected(marker)
                panTo(marker)
            }}
          ></Marker>
        );
      })}
      {selected ? (
        <InfoWindow
          // anchor = {selected.name }
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className="infoWindow">
            <h4 style={{ color: "black", textDecoration: "underline" }}>
              {selected.name}
            </h4>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>

    // </LoadScript>
  );
};

export default React.memo(RealMap);
