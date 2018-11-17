import * as React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Card = ({ dayId, title, tasks, onChange}) => {
  return (
    <div className='card'>
      <h4>{title}</h4>
      <ul>
        {tasks
          ? Object.entries(tasks).map(([key, taskDetails]) => (
              <li key={key}>
                <label>
                  <input type="checkbox" onChange={() => onChange({ dayId: dayId, taskId: key, value: !taskDetails.completed })} checked={taskDetails.completed} />
                  {taskDetails.name}
                </label>
              </li>
            ))
          : <li>No tasks</li>}
      </ul>
    </div>
  )
}

Card.propTypes = {
  dayId: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  tasks: PropTypes.object
}

export default Card;
