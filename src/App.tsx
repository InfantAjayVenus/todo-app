import { Container, CssBaseline, ThemeOptions, ThemeProvider, Typography, createTheme } from '@mui/material';
import Helmet from 'react-helmet';
import Home from './pages/Home';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#F78079',
    },
    secondary: {
      main: '#22bec7',
    },
    background: {
      default: 'rgb(228, 240, 250)',
      paper: 'rgb(230, 238, 248)',
    },
    text: {
      primary: 'rgb(43, 60, 91)',
      secondary: 'rgb(122, 138, 163)',
      disabled: 'rgb(196, 205, 209)',
    },
  },
};

const lightTheme = createTheme(themeOptions);

function App() {
  return (
    <>
      <Helmet>
        <title>todo.</title>
      </Helmet>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Container
          sx={{
            padding: '2rem 3rem'
          }}
        >
          <header>
            <Typography variant='h3' fontWeight={'700'} color='primary.main'>todo.</Typography>
          </header>
          <Home />
        </Container>

      </ThemeProvider>
    </>
  );
}

export default App;
