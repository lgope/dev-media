import * as actions from '../actionTypes';
import axios from 'axios';

// Post/create a scream
export const postScream = newScream => dispatch => {
  dispatch({ type: actions.LOADING_UI });
  axios
    .post('/scream', newScream)
    .then(res => {
      dispatch({
        type: actions.POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(error => {
      dispatch({
        type: actions.SET_ERRORS,
        payload: error.response.data,
      });
    });
};

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

// get one scream
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: actions.LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: actions.SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: actions.STOP_LOADING_UI });
    })
    .catch((error) => console.error(error));
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

// delete Scream by id
export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: actions.DELETE_SCREAM, payload: screamId });
    })
    .catch(err => console.error(err));
};

// clear errors
export const clearErrors = () => dispatch => {
  dispatch({ type: actions.CLEAR_ERRORS });
};
