import * as actions from '../actionTypes';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case actions.SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };

    case actions.SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };

    case actions.LIKE_SCREAM:
    case actions.UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      // if (state.scream.screamId === action.payload.screamId) {
      //   state.scream = action.payload;
      // }
      return {
        ...state,
      };

    case actions.DELETE_SCREAM:
      let screamIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(screamIndex, 1);
      return {
        ...state,
      };

    case actions.POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case actions.SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    case actions.POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case actions.DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
