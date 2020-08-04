import React, { useState, useEffect } from "react";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import styled from "styled-components";
import data from "./data/data";
import Port from "./Components/Port";

import SlidePair from "./Components/SlidePair";
import SlideImpair from "./Components/SlideImpair";

function App({ className }) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(data.sliders[0]);
  const [isPair, setIsPair] = useState(false);
  const numberOfSlides = data.sliders.length - 1;

  useEffect(() => {
    setSlides(data.sliders[index]);
  }, [index]);

  const nextSlide = () => {
    if (index < numberOfSlides) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setSlides(data.sliders[index]);
      verifyPair(index);
      console.log(slides.text);
    }
  };

  const verifyPair = (i) => {
    if (i % 2 === 0) {
      setIsPair(true);
    } else {
      setIsPair(false);
    }
  };

  return (
    <div className={className}>
      <GlobalStyle />
      <Port />
      <div className="slides">
        <SlidePair slides={slides} isPair={isPair} nextSlide={nextSlide} />
        <SlideImpair slides={slides} isPair={isPair} nextSlide={nextSlide} />
      </div>
    </div>
  );
}

export default styled(App)`
  .slides {
    background: red;
  }
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
