import * as actions from '../actionTypes';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: actions.LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      // console.log(res.data);
      setAuthorizationHeader(res.data.token);

      dispatch(getUserData());
      dispatch({ type: actions.CLEAR_ERRORS });
      history.push('/');
    })
    .catch(error => {
      dispatch({
        type: actions.SET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: actions.LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: actions.CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: actions.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// logout user
export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: actions.SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: actions.LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      dispatch({ type: actions.SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};

// upload profile Image
export const uploadImage = formData => dispatch => {
  dispatch({ type: actions.LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.eror(err));
};

// Edit User Details
export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: actions.LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.error(err));
};

// mark notification read
export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post('/notifications', notificationIds)
    .then(res => {
      dispatch({
        type: actions.MARK_NOTIFICATIONS_READ,
      });
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
