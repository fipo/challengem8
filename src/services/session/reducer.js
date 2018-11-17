import { ActionTypes } from './actions';

const initialState = {
  defaultChallenge: 'pNq20Na07q2oZnwPQOoJ'
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AuthSignIn:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default sessionReducer;
