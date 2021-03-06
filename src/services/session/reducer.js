import { ActionTypes } from './actions';

const initialState = {};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AuthSignIn:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.AuthSignOut:
      return initialState;
    default:
      return state;
  }
}

export default sessionReducer;
