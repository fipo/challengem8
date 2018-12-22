import { firestore } from '../../firebase';

export const ActionTypes = {
  RequestUser: 'REQUEST_USER',
  ReceiveUserChallenges: 'RECEIVE_USER_CHALLENGES',
  RequestedUserDoNotExist: 'REQUESTED_USER_DO_NOT_EXIST'
};

export const getUserChallenges = userName => dispatch => {
  dispatch({
    type: ActionTypes.RequestUser
  });

  const query = firestore.collection('users').where('userName', '==', userName);

  query.onSnapshot(
    snapshot => {
      if (snapshot.empty) {
        dispatch({
          type: ActionTypes.RequestedUserDoNotExist
        });
      } else {
        dispatch({
          type: ActionTypes.ReceiveUserChallenges,
          payload: snapshot.docs[0].data()
        });
      }
    },
    err => console.error(err)
  );
};
