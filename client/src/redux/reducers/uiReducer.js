import * as actions from '../actionTypes';

const initialState = {
    loading: false,
    errors: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case actions.SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
      case actions.CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: null
        };
      case actions.LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case actions.STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }