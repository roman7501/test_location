import React, { useState, useEffect } from "react";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import styled from "styled-components";
import Slide from "./Components/Slide";
import data from "./data/data";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const time2 = 30;
const time3 = 1500;
const time1 = time2 + time3;

function App({ className }) {
  const [index, setIndex] = useState(0);
  const [sliders, setSliders] = useState(data.sliders[0]);

  const nextSlide = () => {
    if (index < Object.keys(sliders).length) {
      const newIndex = index + 1;
      setSliders(data.sliders[index]);
      setIndex(newIndex);
    }
  };

  useEffect(() => {
    setSliders(data.sliders[index]);
  }, [index]);

  return (
    <div className="App" className={className}>
      <GlobalStyle />
      <TransitionGroup className="card-container">
        <CSSTransition key={sliders.text} timeout={time1} classNames="slide">
          <Slide sliders={sliders} />
        </CSSTransition>
      </TransitionGroup>
      <button onClick={() => nextSlide()}>Next</button>
    </div>
  );
}

export default styled(App)`
  .slide-enter {
    opacity: 0;
    z-index: 1;
  }
  .slide-enter.slide-enter-active {
    opacity: 1;
    transition: opacity ${time2}ms linear;
  }
  .slide-enter-done {
  }

  /* slide exit */
  .slide-exit {
    opacity: 1;
  }
  .slide-exit.slide-exit-active {
    opacity: 0;
    transition: opacity ${time3}ms linear;
  }
  .slide-exit-done {
    opacity: 0;
  }
`;
