import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { Randomizer } from './hooks/store';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './context';
import theme from './theme';

import App from './App';

const randomizer = new Randomizer();

ReactDOM.render(
  <StoreProvider value={randomizer}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
