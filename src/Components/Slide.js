import React, { useState } from "react";
import styled from "styled-components";

const Slide = ({ sliders, className }) => {
  const { text, transition } = sliders;

  return (
    <div>
      <div>
        <p className={text}>{text}</p>
      </div>
    </div>
  );
};

export default styled(Slide)`
  .text {
  }
`;
