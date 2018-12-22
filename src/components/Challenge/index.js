import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { oneDayInSeconds, formatDateLong, formatDateShort } from 'src/common/constants';
import { areEqual } from 'src/common/utilities';

import Card from './Card';

import './styles.css';

class Challenge extends React.Component {
  state = {
    startDate: '',
    endDate: '',
    startDateFormatted: '',
    endDateFormatted: ''
  };

  componentDidUpdate(prevProps) {
    const { userSettings } = this.props;
    if (!areEqual(userSettings, prevProps.userSettings)) {
      const startDate = moment.unix(userSettings.startDate.seconds);
      const endDate = moment.unix(userSettings.endDate.seconds);

      this.setState({
        startDate,
        endDate,
        startDateFormatted: startDate.format(formatDateLong),
        endDateFormatted: endDate.format(formatDateLong)
      });
    }
  }

  calculateDates = dayIndex => {
    const startDateInSec = this.props.userSettings.startDate.seconds;
    const date = moment.unix(startDateInSec + dayIndex * oneDayInSeconds);

    return {
      dateFormatted: date.format(formatDateShort),
      dateIsToday: date.isSame(moment(), 'day'),
      dateIsBefore: date.isBefore(moment(), 'day')
    };
  };

  render() {
    const { challenge, userSettings, userFirstName } = this.props;
    const { startDateFormatted, endDateFormatted } = this.state;

    if (Object.keys(challenge).length === 0) {
      return <div>Loading</div>;
    }

    return (
      <div className="challenge">
        <h1>{`${userFirstName}'s ${challenge.name}`}</h1>
        <p>
          {startDateFormatted} - {endDateFormatted}
        </p>
        <div className="list">
          {Object.entries(challenge.days).map(([key, day], dayIndex) => {
            return (
              <Card
                key={key}
                dayId={key}
                relativityInTime={this.calculateDates(dayIndex)}
                onChange={this.props.onChange}
                userMarks={userSettings.days[key]}
                isEditable={this.props.isEditable}
                {...day}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  userSettings: PropTypes.object,
  userFirstName: PropTypes.string,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool
};

export default Challenge;
