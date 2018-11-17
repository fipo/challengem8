import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { authenticate } from 'src/services/session/actions';
import { fetchChallenges, handleOnTaskComplete } from 'src/services/challenges/actions';

import './styles.css';

import Card from 'src/components/Card';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchChallenges(this.props.defaultChallenge);
  }

  onChange = (props) => {
    this.props.handleOnTaskComplete({challengeId: this.props.defaultChallenge, ...props});
  }

  render() {
    const {challenges} = this.props;

    if ( Object.keys(challenges).length === 0 ) {
      return (<div>Loading</div>);
    }

    return (
      <div>
        <button onClick={() => this.props.authenticate()}>auth</button>
        <h1>{challenges.name}</h1>
        <div className='list'>
          {Object.entries(challenges.days).map(([key, day]) => (
            <Card key={key} dayId={key} {...day} onChange={this.onChange} />
          ))}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  authenticate: PropTypes.func,
  fetchChallenges: PropTypes.func,
  handleOnTaskComplete: PropTypes.func,
  defaultChallenge: PropTypes.string,
  challenges: PropTypes.object
}

const mapStateToProps = state => ({
  defaultChallenge: state.session.defaultChallenge,
  challenges: state.challenges
})

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  fetchChallenges: (id) => dispatch(fetchChallenges(id)),
  handleOnTaskComplete: (props) => dispatch(handleOnTaskComplete(props)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);
