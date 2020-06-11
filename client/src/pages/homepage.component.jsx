import React, { Component } from 'react';
import axios from 'axios';

// All Material Stuff
import Grid from '@material-ui/core/Grid';

// all components
import Scream from '../components/scream/scream.component';
import Profile from '../components/profile/profile.component';

export class Homepage extends Component {
  state = {
    screams: null,
  };

  componentDidMount() {
    axios
      .get('/screams')
      .then(res => {
        this.setState({ screams: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    let screamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default Homepage;
