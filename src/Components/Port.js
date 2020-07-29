import React from "react";

import styled from "styled-components";
import useLocation from "../hooks/useLocation";

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
  } = useLocation();
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
        <input
          onChange={handleChangeLat}
          type="text"
          name="lat2"
          value={lat2}
        />{" "}
        |
        <input
          onChange={handleChangeLong}
          type="text"
          name="long2"
          value={long2}
        />
      </div>
      <div className="port">
        <button onClick={getLocation}>trouver un port</button>
        {distance && distance > 10 && (
          <p>Un port se trouve à environ {distance} pas</p>
        )}
        {distance && distance < 10 && (
          <div>
            <p>Sous vos pieds il y a un son</p>
            <audio
              controls
              src="https://firebasestorage.googleapis.com/v0/b/esquif-f53eb.appspot.com/o/Orchestre%20Lamoureux%20-%2009%20-%20Pocket%20Piano%20Orchestral%20Version.mp3?alt=media&token=e066c44a-fbae-4521-803b-18350cca469c"
            ></audio>
          </div>
        )}
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
  input {
    padding: 0.5em;
    border: none;
    border-radius: 5px;
  }
`;
