import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

// all components
import Scream from '../components/scream/scream.component';

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
          <p>Profile Details..</p>
        </Grid>
      </Grid>
    );
  }
}

export default Homepage;
