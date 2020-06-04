import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

// All components
import Navbar from './components/navbar.component';
import themeObj from './utils/theme';
import AuthRoute from './utils/AuthRoute'

// all pages
import homepage from './pages/homepage.component';
import login from './pages/login.component';
import signup from './pages/signup.component';

const theme = createMuiTheme(themeObj);

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    // store.dispatch({ type: SET_AUTHENTICATED });
    // axios.defaults.headers.common['Authorization'] = token;
    // store.dispatch(getUserData());
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={homepage} />
              <AuthRoute exact path='/login' component={login} authenticated={authenticated} />
              <AuthRoute exact path='/signup' component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
