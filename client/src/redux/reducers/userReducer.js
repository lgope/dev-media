import * as actions from '../actionTypes';


const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        
        case actions.SET_UNAUTHENTICATED:
            return initialState;
        
        case actions.SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };

        default:
            return state;
    }
}