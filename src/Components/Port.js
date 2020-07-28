import React, { useState, useEffect } from "react";

import styled from "styled-components";

const Port = ({ className }) => {
  const [lat1, setLat1] = useState(null);
  const [long1, setLong1] = useState(null);
  const lat2 = 48.850455;
  const long2 = 2.382466;
  const [distance, setDistance] = useState(null);

  // ** Definition des fonctions

  // * Get data location
  const getCoordinates = (position) => {
    setLat1(position.coords.latitude);
    setLong1(position.coords.longitude);
  };

  // * Errors for location

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("ton esquif n'est pas autorisé a utilisé le radar");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Actuellement, le port est introuvable");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  // *Format numbers **
  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // * Calcul distance
  const measure = (la1, lo1, la2, lo2) => {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    console.log(la1, lo1);
    var dLat = (la2 * Math.PI) / 180 - (la1 * Math.PI) / 180;
    var dLon = (lo2 * Math.PI) / 180 - (lo1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((la1 * Math.PI) / 180) *
        Math.cos((la2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    const result = d * 1000;
    const formatResult = numberWithSpaces(Math.round(result)); // meters
    setDistance(formatResult);
  };

  // 1. Vérification si navigateur géolocalise

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      alert("ton esquif n'est pas autorisé a utilisé son radar");
    }
  };
  // 2/ Get distance

  useEffect(() => {
    if (lat1) {
      measure(lat1, long1, lat2, long2);
    }
  }, [lat1, long1]);

  return (
    <div className={className}>
      <div className="info">
        <p>Location :</p>
        <p>
          {lat1} - {long1}
        </p>

        <p>Port :</p>
        <p>
          {lat2} - {long2}
        </p>
      </div>
      <div className="port">
        <button onClick={getLocation}>trouver un port</button>
        {distance && distance > 10 && (
          <p>Un port se trouve à environ {distance} pas</p>
        )}
        {distance && distance < 10 && <p>Sous vos pieds il y a un son</p>}
      </div>
    </div>
  );
};

export default styled(Port)`
  padding: 3px;
  .info {
    color: grey;
    font-size: 0.8em;
  }
  .port {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  button {
    background: transparent;
    color: white;
    border: 0.5px solid white;
    padding: 1em;
    outline: transparent;
  }
`;
