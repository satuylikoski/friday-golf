import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { animated, useSpring } from "react-spring";

export default function Randomizer({ points, rules }) {
  const [b, setB] = useState(0);
  const [s, setS] = useState(0);
  const [miss, setMiss] = useState(0);
  const spring = useSpring({
    from: { b: 0, s: 0, miss: 0 },
    to: { b, s, miss }
  });

  useEffect(() => {
    setB(0);
    setS(0);
    setMiss(0);
  }, [points]);

  function rnd(current, [min, max]) {
    let newValue;

    if (min === max) {
      return min;
    }

    if (rules.avoidNull || rules.notSame) {
      do {
        newValue = Math.floor(Math.random() * (max - min + 1) + min);
      } while (
        (newValue === current && rules.notSame) ||
        (rules.avoidNull && newValue === 0)
      );
    } else {
      newValue = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return newValue;
  }

  const randomize = () => {
    setB(rnd(b, points.b));
    setS(rnd(s, points.s));
    setMiss(rnd(miss, points.miss));
  };

  return (
    <>
      <Wrapper mt={10}>
        <Box>
          <HoleName>big</HoleName>
          <Point>{spring.b.interpolate(b => b.toFixed(0))}</Point>
          <Description>
            From {points.b[0]} to {points.b[1]}
          </Description>
        </Box>

        <Box>
          <HoleName>small</HoleName>
          <Point>{spring.s.interpolate(s => s.toFixed(0))}</Point>
          <Description>
            From {points.s[0]} to {points.s[1]}
          </Description>
        </Box>

        <Box>
          <HoleName>miss</HoleName>
          <Point>{spring.miss.interpolate(miss => miss.toFixed(0))}</Point>
          <Description>
            From {points.miss[0]} to {points.miss[1]}
          </Description>
        </Box>

        <ColorButton onClick={() => randomize()}>Randomize</ColorButton>
      </Wrapper>
    </>
  );
}

const ColorButton = withStyles({
  root: {
    gridColumn: "2",
    color: "white",
    backgroundColor: "#0b0b0b",
    fontFamily: "Assistant",
    textTransform: "lowercase",
    border: "3px solid #FBCE39",
    fontSize: "30px",
    fontWeight: "600",
    padding: "20px 100px",
    "&:hover": {
      backgroundColor: "#0b0b0b",
      color: "white",
      borderColor: "#0b0b0b"
    }
  }
})(Button);

const Point = styled(animated.h1)`
  color: white;
  font-size: 60px;

  @media only screen and (min-width: 600px) {
    font-size: 100px;
  }
`;

const HoleName = styled.h1`
  font-size: 24px;
  color: white;
  letter-spacing: 3px;
  margin-bottom: 24px;

  @media only screen and (min-width: 600px) {
    font-size: 36px;
  }
`;

const Description = styled.h2`
  color: white;
  font-size: 16px;
  font-weight: 400;
  margin-top: 24px;

  @media only screen and (min-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled(Box)`
  display: grid;
  position: relative;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto auto;
  grid-row-gap: 10vh;

  width: 100%;

  align-items: center;
  justify-items: center;
  text-align: center;
`;
