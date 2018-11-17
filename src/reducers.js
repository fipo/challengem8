import { combineReducers } from 'redux';

import session from 'src/services/session/reducer';
import challenges from 'src/services/challenges/reducer';

export default combineReducers({
  challenges,
  session,
});
