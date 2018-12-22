import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserChallenges } from 'src/services/user/actions';
import { getChallenge, handleOnTaskComplete } from 'src/services/challenge/actions';

import { areEqual } from 'src/common/utilities';

import Challenge from 'src/components/Challenge';

class User extends React.Component {
  componentDidMount() {
    this.props.getUserChallenges(this.props.match.params.userName);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (!areEqual(prevProps.user, user)) {
      if (user.challenges) {
        const challengeId = Object.keys(user.challenges)[0];
        this.props.getChallenge(challengeId);
      }
    }
  }

  onChange = options => {
    const { challenge, handleOnTaskComplete, user } = this.props;

    handleOnTaskComplete({ challengeId: challenge.id, userId: user.uid, ...options });
  };

  isEditable = () => this.props.session.uid === this.props.user.uid;

  render() {
    const { challenge, user } = this.props;
    return (
      <main>
        <p>
          {user.displayName}
          <img src={user.photoURL} alt={user.displayName} />
        </p>
        {user.challenges ? (
          <Challenge
            challenge={challenge}
            userSettings={user.challenges[challenge.id]}
            onChange={this.onChange}
            isEditable={this.isEditable()}
            userFirstName={user.displayName.split(' ')[0]}
          />
        ) : (
          'User has no assigned challenges!'
        )}
      </main>
    );
  }
}

User.propTypes = {
  match: PropTypes.object,
  getUserChallenges: PropTypes.func,
  getChallenge: PropTypes.func,
  handleOnTaskComplete: PropTypes.func,
  challenge: PropTypes.object,
  user: PropTypes.object,
  session: PropTypes.object
};

const mapStateToProps = ({ challenge, user, session }) => ({
  challenge,
  user,
  session
});

const mapDispatchToProps = dispatch => ({
  getUserChallenges: userName => dispatch(getUserChallenges(userName)),
  getChallenge: id => dispatch(getChallenge(id)),
  handleOnTaskComplete: options => dispatch(handleOnTaskComplete(options))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
