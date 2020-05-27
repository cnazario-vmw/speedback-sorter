import React from 'react';
import ReactDOM from 'react-dom';
import SpeedbackAdmin from './SpeedbackAdmin';
import matcher from './Matcher'

ReactDOM.render(
  <React.StrictMode>
    <SpeedbackAdmin matcher={matcher}/>
  </React.StrictMode>,
  document.getElementById('root')
);

