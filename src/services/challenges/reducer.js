import { ActionTypes } from './actions';

const initialState = {};

function challengesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ReceiveChallenges:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default challengesReducer;
