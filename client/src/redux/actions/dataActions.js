import * as actions from '../actionTypes';
import axios from 'axios';

// Get all screams from back-end
export const getScreams = () => dispatch => {
  dispatch({ type: actions.LOADING_DATA });
  axios
    .get('/screams')
    .then(res => {
      dispatch({
        type: actions.SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: actions.SET_SCREAMS,
        payload: [],
      });
    });
};

// like a scream
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: actions.LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch(err => console.error(err));
};

// unlike a scream
export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: actions.UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch(err => console.error(err));
};
