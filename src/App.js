import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box';
import styled, { createGlobalStyle } from 'styled-components';

import Button from './components/Button';
import useChangers from './hooks/changers';

import fridayGolf from './friday-golf.png';
import Randomizer from './Randomizer';
import Adjuster from './Adjuster';
import GameChanger from './GameChanger';
import useStore from './hooks/store';

function App() {
  const changers = useChangers();
  const store = useStore();

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
        <Button onClick={() => store.randomizeChanger(changers)} disabled={isEmpty(changers)}>
          Game changer
        </Button>
        <Logo src={fridayGolf} alt="friday golf" />
        <Adjuster />
      </Box>

      <Wrapper>
        <GameChanger changers={changers} />
        <Randomizer />
      </Wrapper>
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
