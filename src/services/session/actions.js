import { firestore, auth, authProvider } from '../../firebase';

export const ActionTypes = {
  AuthSignIn: 'AUTH_SIGN_IN',
  AuthSignOut: 'AUTH_SIGN_OUT',
  GetUsers: 'GET_USERS',
  RequestUsers: 'REQUEST_USERS',
  ReceiveUsers: 'RECEIVE_USERS',
}

export const firebaseObservers = () => dispatch => {
  auth.onAuthStateChanged( user => {
    if (user) {
      dispatch({
        type: ActionTypes.AuthSignIn,
        payload: {
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
        }
      })
    } else {
      dispatch({ type: ActionTypes.AuthSignOut })
    }
  })
}

const requestUsers = () => ({
  type: ActionTypes.RequestUsers
})

const receiveUsers = (users) => ({
  type: ActionTypes.ReceiveUsers,
  receivedAt: Date.now(),
  users
})

export const fetchUsers = () => dispatch => {
  dispatch(requestUsers());

  firestore.collection('users').get()
    .then(users => dispatch(receiveUsers(users)))
    .catch(err => console.error(err));
}

export const authenticate = () => {
  auth.signInWithPopup(authProvider)
    .then(result => {
      firestore.collection('users').doc(result.user.uid).set({
        uid: result.user.uid,
        photoURL: result.user.photoURL,
        displayName: result.user.displayName,
      });
    })
    .catch(err => console.error(err));
}
