import { firestore } from '../../firebase';

export const ActionTypes = {
  RequestChallenge: 'REQUEST_CHALLENGE',
  ReceiveChallenge: 'RECEIVE_CHALLENGE',
  RequestTaskUpdate: 'REQUEST_TASK_UPDATE'
};

const receiveChallenge = challenge => ({
  type: ActionTypes.ReceiveChallenge,
  payload: challenge
});

export const getChallenge = id => dispatch => {
  dispatch({
    type: ActionTypes.RequestChallenge
  });

  const query = firestore.collection('challenges').doc(id);
  // query.get()
  //   .then(challenge => dispatch(receiveChallenges(challenge.data())))
  //   .catch(err => console.error(err))
  query.onSnapshot(
    challenge => dispatch(receiveChallenge({ id, ...challenge.data() })),
    err => console.error(err)
  );
};

const requestTaskUpdate = id => ({
  type: ActionTypes.RequestTaskUpdate,
  payload: id
});

export const handleOnTaskComplete = props => dispatch => {
  const updateField = `challenges.${props.challengeId}.days.${props.dayId}.tasks.${props.taskId}`;

  dispatch(requestTaskUpdate(props));
  firestore
    .collection('users')
    .doc(props.userId)
    .update({
      [updateField]: props.value
    });
};
