import * as React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Card = ({ dayId, relativityInTime, title, tasks, userMarks, onChange, isEditable }) => {
  const isChecked = key => (userMarks ? userMarks.tasks[key] : false);

  const classes = [
    'card',
    relativityInTime.dateIsToday && 'today',
    relativityInTime.dateIsBefore && 'before'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="cardHead">
        <h4>{title}</h4>
        <span>{relativityInTime.dateFormatted}</span>
      </div>
      <ul>
        {tasks ? (
          Object.entries(tasks).map(([key, taskName]) => (
            <li key={key}>
              <label>
                <input
                  type="checkbox"
                  onChange={({ target }) =>
                    onChange({
                      dayId,
                      taskId: key,
                      value: target.checked
                    })
                  }
                  checked={isChecked(key)}
                  disabled={!isEditable}
                />
                {taskName}
              </label>
            </li>
          ))
        ) : (
          <li>No tasks - take a rest for today</li>
        )}
      </ul>
    </div>
  );
};

Card.propTypes = {
  userMarks: PropTypes.object,
  dayId: PropTypes.string,
  relativityInTime: PropTypes.object,
  onChange: PropTypes.func,
  title: PropTypes.string,
  tasks: PropTypes.object,
  isEditable: PropTypes.bool
};

export default Card;
