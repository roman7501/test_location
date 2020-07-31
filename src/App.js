import React, { useState, useEffect } from "react";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import styled from "styled-components";
import Slide from "./Components/Slide";
import data from "./data/data";

import { useTransition, animated } from "react-spring";
import SlidePair from "./Components/SlidePair";
import SlideImpair from "./Components/SlideImpair";

function App({ className }) {
  const [index, setIndex] = useState(0);
  const [sliders, setSliders] = useState(data.sliders[0]);
  const [indexSlide, setIndexSlide] = useState(5);
  const [isPair, setIsPair] = useState(false);

  const nextSlide = () => {
    if (index < indexSlide) {
      const newIndex = index + 1;
      setSliders(data.sliders[index]);
      setIndex(newIndex);
      pair(index);
      console.log(isPair, index);
    }
  };

  const pair = (i) => {
    if (i % 2 === 0) {
      setIsPair(true);
    } else {
      setIsPair(false);
    }
  };

  useEffect(() => {
    setSliders(data.sliders[index]);
  }, [index]);

  const transitions = useTransition(isPair, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const transitions2 = useTransition(!isPair, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className={className} onClick={() => nextSlide()}>
      <GlobalStyle />
      {isPair &&
        transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <SlidePair />
              </animated.div>
            )
        )}
      {!isPair &&
        transitions2.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <SlideImpair />
              </animated.div>
            )
        )}
    </div>
  );
}

export default styled(App)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
