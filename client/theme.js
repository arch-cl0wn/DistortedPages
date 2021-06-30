import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#14171f',
      dark: '#101218',
      light: '#5c688a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#000000',
      main: '#000000',
      dark: '#cccccc',
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },

  typography: {
    fontFamily: [
      'Poppins',
      'Lora',
      'sans-serif',
    ].join(','),
    body1: {
      fontFamily: [
        'Lora',
        'sans-serif',
      ].join(','),
      fontSize: 22,
    },
    h1: {
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
      fontSize: 30,
    },
    h2: {
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
      fontSize: 60,
    },
  },

});

theme = responsiveFontSizes(theme);

export default theme;