import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Catamaran"', 'sans-serif'].join(','),
    h1: {
      fontWeight: 800
    },
    h6: {
      fontWeight: 600
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        body1: 'span'
      }
    }
  }
});

export default theme;
