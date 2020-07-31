import React from "react";
import styled from "styled-components";

const Slide = ({ sliders, className }) => {
  const { text } = sliders;

  return (
    <div>
      <div className="text">
        <p className={text}>{text}</p>
      </div>
    </div>
  );
};

export default styled(Slide)``;
