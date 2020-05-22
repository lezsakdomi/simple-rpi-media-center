import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import HDMIPlayer from './containers/HDMIPlayer';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HDMI_PLAYER} component={HDMIPlayer} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
