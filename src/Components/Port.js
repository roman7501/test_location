import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import styled from "styled-components";
import useLocation from "../hooks/useLocation";
import Info from "./Info";

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
  const [isPlay, setIsPlay] = useState(false);
  return (
    <div className={className}>
      <CSSTransition
        in={!isPlay}
        appear={false}
        timeout={1000}
        classNames="fade"
      >
        <Info
          className="info"
          lat1={lat1}
          long1={long1}
          lat2={lat2}
          long2={long2}
          handleChangeLat={handleChangeLat}
          handleChangeLong={handleChangeLong}
        />
      </CSSTransition>

      <div className="port">
        <button onClick={getLocation}>trouver un port</button>
        {distance && distance > 10 && (
          <p>Un port se trouve à environ {distance} pas</p>
        )}
        {distance && distance < 10 && (
          <CSSTransition
            in={!isPlay}
            appear={true}
            timeout={1000}
            classNames="fade"
          >
            <div>
              <p>Sous vos pieds il y a un son</p>
              <button onClick={() => setIsPlay(true)}>écouter</button>
            </div>
          </CSSTransition>
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
  .fade-appear {
    opacity: 0;
  }
  .fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 1s linear;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 1000ms linear;
  }
  .fade-exit-done {
    opacity: 0;
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
