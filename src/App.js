import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';
import styled, { createGlobalStyle } from 'styled-components';

import fridayGolf from './assets/friday-golf.png';
import useChangers from './hooks/changers';
import useStore from './hooks/store';

import Randomizer from './containers/Randomizer';
import Settings from './containers/Settings';
import Instructions from './containers/Instructions';
import GameChanger from './containers/GameChanger';

import Button from './components/Button';

function App() {
  const changers = useChangers();
  const store = useStore('gameChanger');

  // Next: Add some animations if max or min reached e.g.
  return (
    <>
      <Global />
      <Box display="flex" justifyContent="center" as="header">
        <Logo src={fridayGolf} alt="friday golf" />
      </Box>

      <Settings />
      <Instructions />

      <Box display="flex" justifyContent="center" mt={2}>
        <Button onClick={() => store.randomizeChanger(changers)} disabled={isEmpty(changers)}>
          Game changer
        </Button>
      </Box>

      <Wrapper>
        <GameChanger changers={changers} />
        <Randomizer />
      </Wrapper>
    </>
  );
}

const Logo = styled.img`
  height: 40px;

  @media only screen and (min-width: 600px) {
    height: 70px;
  }

  @media only screen and (min-width: 1024px) {
    height: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  flex-direction: column;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Global = createGlobalStyle`
  html, body {
    background-color: #0b0b0b;
    margin-top: 10px;
    font-family: 'Catamaran', sans-serif;
  }
`;

export default App;
