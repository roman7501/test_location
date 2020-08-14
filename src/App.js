import React, { useState, useEffect } from "react";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import styled from "styled-components";
import data from "./data/data";

import SlidePair from "./Components/SlidePair";
import SlideImpair from "./Components/SlideImpair";

function App({ className }) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(data.sliders[0]);
  const [isPair, setIsPair] = useState(false);
  const numberOfSlides = data.sliders.length - 1;
  const [onMobile, setOnMobile] = useState();

  useEffect(() => {
    setSlides(data.sliders[index]);
    verifMobile();
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

  const verifMobile = () => {
    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };
    if (isMobile.any()) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  };
  return (
    <div className={className}>
      <GlobalStyle />
      {onMobile === false && <p>L'esquif a besoin d'être sur un téléphone</p>}
      {onMobile && (
        <div>
          <div className="slides">
            <SlidePair slides={slides} isPair={isPair} nextSlide={nextSlide} />
            <SlideImpair
              slides={slides}
              isPair={isPair}
              nextSlide={nextSlide}
            />
          </div>
        </div>
      )}
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
