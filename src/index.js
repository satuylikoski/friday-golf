import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { GameChanger } from './stores/GameChanger';
import { Settings } from './stores/Settings';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './context';
import theme from './theme';

import App from './App';

const stores = {
  gameChanger: new GameChanger(),
  settings: new Settings()
};

ReactDOM.render(
  <StoreProvider value={stores}>
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
