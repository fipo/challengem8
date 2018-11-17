import { firestore } from '../../firebase';

export const ActionTypes = {
  RequestChallenges: 'REQUEST_CHALLENGES',
  ReceiveChallenges: 'RECEIVE_CHALLENGES',
  RequestTaskUpdate: 'REQUEST_TASK_UPDATE',
}

const requestChallenges = () => ({
  type: ActionTypes.RequestChallenges
})

const receiveChallenges = (challenge) => ({
  type: ActionTypes.ReceiveChallenges,
  payload: challenge
})

export const fetchChallenges = (id) => dispatch => {
  dispatch(requestChallenges());

  const query = firestore.collection('challenges').doc(id)
  // query.get()
  //   .then(challenge => dispatch(receiveChallenges(challenge.data())))
  //   .catch(err => console.error(err))
  query.onSnapshot(
    (challenge) => dispatch(receiveChallenges(challenge.data())),
    (err) => console.error(err)
  );
}

const requestTaskUpdate = (id) => ({
  type: ActionTypes.RequestTaskUpdate,
  payload: id
})

export const handleOnTaskComplete = (props) => dispatch => {
  dispatch(requestTaskUpdate(props));
  const updateField = `days.${props.dayId}.tasks.${props.taskId}.completed`;
  firestore.collection('challenges').doc(props.challengeId).update({
    [updateField]: props.value
  })
}
