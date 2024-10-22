import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import UserDashboard from './components/UserDashboard';
import PractitionerDashboard from './components/PractitionerDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ChatInterface} />
          <Route path="/user-dashboard" component={UserDashboard} />
          <Route path="/practitioner-dashboard" component={PractitionerDashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;