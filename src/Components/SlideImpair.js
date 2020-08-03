import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const SlideImpair = ({ className, slides, isPair, nextSlide }) => {
  const fadeIn = slides.enter;
  const fadeOut = slides.exit;

  const style = { marginTop: slides.y1, marginLeft: slides.x1 };

  const sliderVariants = {
    hidden: {
      opacity: 0,
      x: slides.x1,
      y: slides.y1,
    },
    visible: {
      x: slides.x2,
      y: slides.y2,
      opacity: 1,
      transition: { duration: fadeIn },
    },
    exit: {
      opacity: 0,
      transition: { duration: fadeOut },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 2, duration: 1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0 },
    },
  };
  return (
    <AnimatePresence>
      {!isPair && (
        <motion.div
          className={className}
          variants={sliderVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div>
            <p style={style}>{slides.text}</p>
          </div>
          <motion.div
            className="button"
            variants={buttonVariants}
            onClick={() => {
              nextSlide();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default styled(SlideImpair)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .button {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50px;
    border: none;
    outline: none;
  }
`;
