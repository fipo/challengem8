import { firestore, auth, authProvider } from '../../firebase';

export const ActionTypes = {
  AuthSignIn: 'AUTH_SIGN_IN',
  AuthSignOut: 'AUTH_SIGN_OUT',
  GetUsers: 'GET_USERS',
  RequestUsers: 'REQUEST_USERS',
  ReceiveUsers: 'RECEIVE_USERS',
  RequestAuth: 'REQUEST_AUTH'
};

export const firebaseObservers = () => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then(result =>
          dispatch({
            type: ActionTypes.AuthSignIn,
            payload: result.data()
          })
        );
    } else {
      dispatch({ type: ActionTypes.AuthSignOut });
    }
  });
};

const requestUsers = () => ({
  type: ActionTypes.RequestUsers
});

const receiveUsers = users => ({
  type: ActionTypes.ReceiveUsers,
  receivedAt: Date.now(),
  users
});

export const fetchUsers = () => dispatch => {
  dispatch(requestUsers());

  firestore
    .collection('users')
    .get()
    .then(users => dispatch(receiveUsers(users)))
    .catch(err => console.error(err));
};

const requestAuth = () => ({
  type: ActionTypes.RequestAuth
});

export const authenticate = () => dispatch => {
  dispatch(requestAuth());
  auth
    .signInWithPopup(authProvider)
    .then(({ user, additionalUserInfo }) => {
      firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            firestore
              .collection('users')
              .doc(user.uid)
              .set({
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                userName: additionalUserInfo.username.toLowerCase()
              });
          }
        });
    })
    .catch(err => console.error(err));
};

export const signOut = () => dispatch => {
  dispatch(requestAuth());
  auth.signOut();
};
