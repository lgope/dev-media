import React, { Component } from 'react';
import PropTypes from 'prop-types';

// All Material Stuff
import Grid from '@material-ui/core/Grid';

// all components
import Scream from '../components/scream/scream.component';
import Profile from '../components/profile/profile.component';
import ScreamSkeleton from '../utils/ScreamSkeleton';

// all redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
export class Homepage extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let screamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );

    return (
      <Grid container spacing={4}>
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

Homepage.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Homepage);
