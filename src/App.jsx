import React from 'react';
import { firestore } from './firebase';

import './styles/app.css';

import Home from 'src/scenes/Home';

class App extends React.Component{
  componentDidMount() {
    firestore.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
      });
    });
  }

  render() {
    return(
      <Home />
    )
  }
}

export default App;
