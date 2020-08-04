import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: 0,
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

const Loader = ({ className }) => {
  return (
    <>
      <motion.div
        className={className}
        variants={loaderVariants}
        animate="animationOne"
      ></motion.div>
    </>
  );
};

export default styled(Loader)`
  width: 10px;
  height: 10px;
  margin: 40px auto;
  border-radius: 50%;
  background: #fff;
`;
