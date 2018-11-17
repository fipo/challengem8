import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { firebaseObservers } from 'src/services/session/actions';

import './styles.css';

import Home from 'src/scenes/Home';

class App extends React.Component{
  componentDidMount() {
    this.props.firebaseObservers();
  }

  render() {
    return(
      <Home />
    )
  }
}

App.propTypes = {
  firebaseObservers: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  firebaseObservers: () => dispatch(firebaseObservers()),
})

export default connect(null, mapDispatchToProps)(App);
