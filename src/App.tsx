import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import Helmet from 'react-helmet';
import Home from './pages/Home';
import { useState } from 'react';


const lightTheme = createTheme({
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
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#815ef7',
    },
    background: {
      default: '#121215',
      paper: '#1d1a28',
    },
    text: {
      primary: '#cdb6fd',
      secondary: '#929098',
      disabled: '#717172',
    }
  }
})

function App() {
  const [isThemeLight, _] = useState(true);

  return (
    <>
      <Helmet>
        <title>todo.</title>
      </Helmet>
      <ThemeProvider theme={isThemeLight ? lightTheme : darkTheme}>
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
