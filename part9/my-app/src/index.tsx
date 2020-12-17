import React from 'react';
import ReactDOM from 'react-dom';

const Welcome: React.FC<{ name: string }> = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

ReactDOM.render(<Welcome name="Aubrey" />, document.getElementById('root'));