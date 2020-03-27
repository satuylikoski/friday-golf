import React, { useState } from 'react';
import { Observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { animated, useSpring } from 'react-spring';

import useStore from '../hooks/store';
import random from '../utils/random';

import Button from '../components/Button';

export default function Randomizer() {
  const [isOpen, setIsOpen] = useState(true);
  const store = useStore('settings');

  const [big, setBig] = useState(0);
  const [small, setS] = useState(0);
  const [miss, setMiss] = useState(0);

  const current = useSpring({
    from: { big: 0, small: 0, miss: 0 },
    to: { big, small, miss }
  });

  const randomize = () => {
    const { points, rules } = store;

    setBig(random(points.big, big, rules));
    setS(random(points.small, small, rules));
    setMiss(random(points.miss, miss, rules));
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
                <Point>{current.big.interpolate(b => b.toFixed(0))}</Point>
                <Description>
                  From {store.bigHole[0]} to {store.bigHole[1]}
                </Description>
              </Box>

              <Box>
                <HoleName>small</HoleName>
                <Point>{current.small.interpolate(s => s.toFixed(0))}</Point>
                <Description>
                  From {store.smallHole[0]} to {store.smallHole[1]}
                </Description>
              </Box>

              <Box>
                <HoleName>miss</HoleName>
                <Point>{current.miss.interpolate(miss => miss.toFixed(0))}</Point>
                <Description>
                  From {store.miss[0]} to {store.miss[1]}
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
