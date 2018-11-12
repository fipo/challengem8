import * as React from 'react';

const Card = (props) => {
  return (
    <div>
      Card
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default Card;
