import React, { useState, useEffect } from "react";
import { Box, Heading } from "@freska/freska-ui";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
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
        <PointBox>
          <HoleName>big</HoleName>
          <Point>{spring.b.interpolate(b => b.toFixed(0))}</Point>
          <Description>
            From {points.b[0]} to {points.b[1]}
          </Description>
        </PointBox>

        <PointBox>
          <HoleName>small</HoleName>
          <Point>{spring.s.interpolate(s => s.toFixed(0))}</Point>
          <Description>
            From {points.s[0]} to {points.s[1]}
          </Description>
        </PointBox>

        <PointBox>
          <HoleName>miss</HoleName>
          <Point>{spring.miss.interpolate(miss => miss.toFixed(0))}</Point>
          <Description>
            From {points.miss[0]} to {points.miss[1]}
          </Description>
        </PointBox>
      </Wrapper>

      <ColorButton onClick={() => randomize()}>Randomize</ColorButton>
    </>
  );
}

const ColorButton = withStyles({
  root: {
    position: "absolute",
    bottom: "15%",
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

const Point = styled(animated(Heading))`
  color: white;
  font-size: 60px;

  ${props => props.theme.mediaQueries.md} {
    font-size: 100px;
  }
`;

const HoleName = styled(Heading)`
  /* text-transform: uppercase; */
  font-size: 24px;
  color: white;
  /* font-family: "Assistant"; */
  letter-spacing: 3px;
  margin-bottom: 24px;

  ${props => props.theme.mediaQueries.md} {
    font-size: 40px;
  }
`;

const Description = styled(Heading)`
  color: white;
  font-size: 16px;
  font-weight: 400;
  margin-top: 24px;

  ${props => props.theme.mediaQueries.md} {
    font-size: 20px;
  }
`;

const Wrapper = styled(Box)`
  display: grid;
  grid-template-columns: 33% 33% 33%;

  width: 100%;
`;

const PointBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
