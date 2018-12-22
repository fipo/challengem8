import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { firebaseObservers } from 'src/services/session/actions';

import './styles.css';

import Home from 'src/scenes/Home';
import User from 'src/scenes/User';

import Navigation from 'src/components/Navigation';

class App extends React.Component {
  componentDidMount() {
    this.props.firebaseObservers();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route path="/:userName" component={User} />
        </React.Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  firebaseObservers: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  firebaseObservers: () => dispatch(firebaseObservers())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
