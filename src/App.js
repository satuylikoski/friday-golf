import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';
import styled, { createGlobalStyle } from 'styled-components';

import Button from './components/Button';
import useChangers from './hooks/changers';

import fridayGolf from './friday-golf.png';
import Randomizer from './Randomizer';
import Settings from './Settings';
import Rules from './Rules';
import GameChanger from './GameChanger';
import useStore from './hooks/store';

function App() {
  const changers = useChangers();
  const store = useStore();

  // Next: Add some animations if max or min reached e.g.
  return (
    <>
      <Global />
      <Box display="flex" justifyContent="center" as="header">
        <Logo src={fridayGolf} alt="friday golf" />
      </Box>

      <Settings />
      <Rules />

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
  align-items: center;

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
