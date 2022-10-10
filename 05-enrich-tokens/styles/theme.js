import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: ['sans-serif', 'Inter'],
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#009FA9',
    },
    secondary: {
      main: 'rgb(19, 23, 42)',
    },
    background: {
      default: "#FBFBFF"
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;