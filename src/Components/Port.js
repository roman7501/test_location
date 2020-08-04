import React, { useState, useEffect } from "react";

import styled from "styled-components";
import useLocation from "../hooks/useLocation";
import Info from "./Info";

import Loader from "./Loader";

const Port = ({ className }) => {
  const {
    handleChangeLat,
    handleChangeLong,
    lat1,
    long1,
    lat2,
    long2,
    getLocation,
    distance,
    location,
    howFar,
    isLoading,
  } = useLocation();

  useEffect(() => {
    console.log("howfar=", howFar);
  });

  const [isPlay, setIsPlay] = useState(false);

  return (
    <div className={className}>
      <Info
        className="info"
        lat1={lat1}
        long1={long1}
        lat2={lat2}
        long2={long2}
        handleChangeLat={handleChangeLat}
        handleChangeLong={handleChangeLong}
      />

      <div className="port">
        <button onClick={getLocation}>trouver un port</button>
        {isLoading && <Loader />}
        {howFar === 100 && <p>Un port se trouve à environ {distance} pas</p>}
        {howFar === 10000 && (
          <p>
            Prochain port : {location.name} - {distance} pas
          </p>
        )}
        {distance && distance < 10 && (
          <div>
            <p>Sous vos pieds il y a un son</p>
            <button onClick={() => setIsPlay(true)}>écouter</button>
          </div>
        )}
      </div>

      {isPlay && (
        <audio
          autoplay="true"
          src="https://firebasestorage.googleapis.com/v0/b/esquif-f53eb.appspot.com/o/Orchestre%20Lamoureux%20-%2009%20-%20Pocket%20Piano%20Orchestral%20Version.mp3?alt=media&token=e066c44a-fbae-4521-803b-18350cca469c"
        ></audio>
      )}

      {isPlay && <p>ferme les yeux</p>}
    </div>
  );
};

export default styled(Port)`
  padding: 3px;
  audio {
    display: none;
  }
  .info {
    color: grey;
    font-size: 0.8em;
    transition: all 10s ease;
    border: 0.5px solid grey;
    margin: 10px;
    padding: 10px;
  }

  .port {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .loader {
    margin-top: 50px;
  }
  button {
    background: transparent;
    color: white;
    border: 0.5px solid white;
    padding: 1em;
    outline: transparent;
  }
  input {
    padding: 0.5em;
    border: none;
    border-radius: 5px;
  }
`;
