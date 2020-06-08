import * as actions from '../actionTypes';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: actions.LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      // console.log(res.data);
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', FBIdToken);

      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: actions.CLEAR_ERRORS });
      history.push('/');
    })
    .catch(error => {
      dispatch({
        type: actions.SET_ERRORS,
        payload: error.response.data
      })
    });
};

export const getUserData = () => dispatch => {
  axios
    .get('/user')
    .then(res => {
      dispatch({ type: actions.SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};
