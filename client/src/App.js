import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';import axios from 'axios';

// All Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import * as actions from './redux/actionTypes';
import { logoutUser, getUserData } from './redux/actions/userActions';

// All components
import Navbar from './components/Navbar/navbar.component';
import themeObj from './utils/theme';
import AuthRoute from './utils/AuthRoute';

// all pages
import homepage from './pages/homepage.component';
import login from './pages/login.component';
import signup from './pages/signup.component';

const theme = createMuiTheme(themeObj);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: actions.SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={homepage} />
              <AuthRoute
                exact
                path='/login'
                component={login}
                
              />
              <AuthRoute
                exact
                path='/signup'
                component={signup}
                
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
