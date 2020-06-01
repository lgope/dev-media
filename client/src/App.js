import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// All components
import Navbar from './components/navbar.component';

// all pages
import homepage from './pages/homepage.component';
import login from './pages/login.component';
import signup from './pages/signup.component';

function App() {
  return (
    <div className=''>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={homepage} />
            <Route exact path='/login' component={login} />
            <Route exact path='/signup' component={signup} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
