import * as actions from '../actionTypes';

const initialState = {
  loading: false,
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };

    case actions.SET_UNAUTHENTICATED:
      return initialState;

    case actions.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    case actions.LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case actions.LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
      
    case actions.UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        ),
      };

    case actions.MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notification => (notification.read = true));
      return {
        ...state,
      };

    default:
      return state;
  }
}
