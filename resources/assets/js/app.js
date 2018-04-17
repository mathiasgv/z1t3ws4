// app.js

require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import CreateNotification from './components/CreateNotification';

render(<CreateNotification />, document.getElementById('notification'));