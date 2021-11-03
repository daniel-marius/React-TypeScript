import React from 'react';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import SearchBar from './components/SearchBar';
import Form from './components/Form';
import './App.css';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

const App: React.FC = (): JSX.Element => {

  return (
    <ThemeProvider theme={theme}>
     <SearchBar />
     <br />
     <Form />
   </ThemeProvider>
  );
};

export default App;
