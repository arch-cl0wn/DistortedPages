import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#162236',
      dark: '#000011',
      light: '#3f4960',
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
      'Black Han Sans',
      'Do Hyeon',
      'sans-serif',
    ].join(','),
    body1: {
      fontFamily: [
        'Do Hyeon',
        'sans-serif',
      ].join(','),
      fontSize: 22,
    },
  },

});

theme = responsiveFontSizes(theme);

export default theme;