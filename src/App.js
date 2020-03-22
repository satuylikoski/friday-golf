import React, { useState, useEffect } from 'react';
import store from 'store';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';
import styled, { createGlobalStyle } from 'styled-components';

import Button from './components/Button';

import randomChanger from './utils/randomChanger';
import useChangers from './hooks/changers';

import fridayGolf from './friday-golf.png';
import ScoreTable from './ScoreTable';
import Randomizer from './Randomizer';
import Adjuster from './Adjuster';
import GameChanger from './GameChanger';

function App() {
  const [points, setPoints] = useState({
    b: [-10, 25],
    s: [-10, 25],
    miss: [-10, 25]
  });
  const changers = useChangers();
  const [rules, setRules] = useState({ avoidNull: false, notSame: false });
  const [index, setIndex] = useState(0);
  const [isChangerOpen, setIsChangerOpen] = useState(false);

  useEffect(() => {
    const points = store.get('points');
    if (points) {
      setPoints(points);
    }

    const rules = store.get('rules');
    if (rules) {
      setRules(rules);
    }
  }, []);

  const showScoreTable = false;

  // Next: Add some animations if max or min reached e.g.
  return (
    <>
      <Global />
      <Box
        display="flex"
        width="100%"
        flexDirection={['column-reverse', 'row', 'row']}
        justifyContent="space-around"
        alignItems={['center', 'flex-start']}
        mt={3}
      >
        <Button
          onClick={() => {
            setIndex(randomChanger(changers));
            setIsChangerOpen(true);
          }}
          disabled={isEmpty(changers)}
        >
          Game changer
        </Button>
        <Logo src={fridayGolf} alt="friday golf" />
        <Adjuster
          initialPoints={points}
          initialRules={rules}
          onUpdate={(points, rules) => {
            setPoints(points);
            setRules(rules);
            store.set('rules', rules);
            store.set('points', points);
          }}
        />
      </Box>

      <Wrapper>
        <GameChanger
          isOpen={isChangerOpen}
          changers={changers}
          index={index}
          onClose={() => setIsChangerOpen(false)}
        />
        <Randomizer points={points} rules={rules} />
      </Wrapper>

      {showScoreTable && <ScoreTable />}
    </>
  );
}

const Logo = styled.img`
  height: 20px;
  order: 1;

  @media only screen and (min-width: 600px) {
    height: 70px;
    order: 0;
  }

  @media only screen and (min-width: 1024px) {
    height: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Global = createGlobalStyle`
  html, body {
    background-color: #0b0b0b;
  }
`;

export default App;
