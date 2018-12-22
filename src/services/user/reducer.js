import { ActionTypes } from './actions';

const initialState = {};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ReceiveUserChallenges:
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

export default userReducer;
