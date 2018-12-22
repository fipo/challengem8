import { combineReducers } from 'redux';

import session from 'src/services/session/reducer';
import challenge from 'src/services/challenge/reducer';
import user from 'src/services/user/reducer';

export default combineReducers({
  challenge,
  session,
  user
});
