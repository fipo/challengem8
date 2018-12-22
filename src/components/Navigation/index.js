import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authenticate, signOut } from 'src/services/session/actions';

import './styles.css';

const Nav = ({ authenticate, session, signOut }) => {
  return (
    <nav className="top-navigation">
      {Object.keys(session).length ? (
        <React.Fragment>
          {session.displayName}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            onClick={signOut}
          >
            <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z" />
          </svg>
        </React.Fragment>
      ) : (
        <button onClick={authenticate}>Login</button>
      )}
    </nav>
  );
};
Nav.propTypes = {
  authenticate: PropTypes.func,
  session: PropTypes.object,
  signOut: PropTypes.func
};

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
  signOut: () => dispatch(signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);