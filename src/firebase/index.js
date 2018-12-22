import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../../.firebase-config.json';

firebase.initializeApp({
  apiKey: config.apikey,
  authDomain: 'challengem8.com',
  databaseURL: 'https://challenge-m8.firebaseio.com',
  projectId: 'challenge-m8',
  storageBucket: 'challenge-m8.appspot.com',
  messagingSenderId: '440178095473'
});

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

const auth = firebase.auth();
const authProvider = new firebase.auth.TwitterAuthProvider();

export { firestore, auth, authProvider };
