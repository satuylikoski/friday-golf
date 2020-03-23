import React, { useState, useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { animated, useSpring } from 'react-spring';

import useStore from '../hooks/store';
import Button from '../components/Button';

export default function Randomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const store = useStore();
  const [b, setB] = useState(0);
  const [s, setS] = useState(0);
  const [miss, setMiss] = useState(0);
  const spring = useSpring({
    from: { b: 0, s: 0, miss: 0 },
    to: { b, s, miss }
  });

  const { points, rules } = store;

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

    if (rules.avoidNull || rules.notSameNumber) {
      do {
        newValue = Math.floor(Math.random() * (max - min + 1) + min);
      } while ((newValue === current && rules.notSame) || (rules.avoidNull && newValue === 0));
    } else {
      newValue = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return newValue;
  }

  const randomize = () => {
    setB(rnd(b, points.big));
    setS(rnd(s, points.small));
    setMiss(rnd(miss, points.miss));
  };

  return (
    <Observer>
      {() => (
        <Wrapper>
          <Box style={{ gridColumn: '1 / span 3' }} mt={[0, 2, 3]} mb={[0, 0, 3]}>
            {/* TODO: Move me away */}
            <Button
              onClick={() => {
                randomize();
                setIsOpen(true);
              }}
              highlight
            >
              points randomizer
            </Button>
          </Box>
          {isOpen && (
            <>
              <Box>
                <HoleName>big</HoleName>
                <Point>{spring.b.interpolate(b => b.toFixed(0))}</Point>
                <Description>
                  From {store.points.big[0]} to {points.big[1]}
                </Description>
              </Box>

              <Box>
                <HoleName>small</HoleName>
                <Point>{spring.s.interpolate(s => s.toFixed(0))}</Point>
                <Description>
                  From {points.small[0]} to {points.small[1]}
                </Description>
              </Box>

              <Box>
                <HoleName>miss</HoleName>
                <Point>{spring.miss.interpolate(miss => miss.toFixed(0))}</Point>
                <Description>
                  From {points.miss[0]} to {points.miss[1]}
                </Description>
              </Box>
            </>
          )}
        </Wrapper>
      )}
    </Observer>
  );
}

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

  width: 100%;

  align-items: center;
  justify-items: center;
  text-align: center;
`;
