import React from 'react';
import ReactDOM from 'react-dom';
import SpeedbackAdmin , {Matcher} from './SpeedbackAdmin';

ReactDOM.render(
  <React.StrictMode>
    <SpeedbackAdmin matcher={() => []}/>
  </React.StrictMode>,
  document.getElementById('root')
);

