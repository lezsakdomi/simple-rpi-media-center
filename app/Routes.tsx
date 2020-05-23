import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import HDMIPlayer from './containers/HDMIPlayer';
import LCDPlayer from './containers/LCDPlayer';
import ManualPlayer from './containers/ManualPlayer';
import ServicePlayer from './containers/ServicePlayer';
import ClosePage from './containers/ClosePage';
import SimplePlayer from './containers/SimplePlayer';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HDMI_PLAYER} component={HDMIPlayer} />
        <Route path={routes.LCD_PLAYER} component={LCDPlayer} />
        <Route path={routes.SELECT_FILE} component={ManualPlayer} />
        <Route path={routes.SERVICE} component={ServicePlayer} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}

export function SimpleRoutes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={ClosePage} />
        <Route component={SimplePlayer} />
      </Switch>
    </App>
  );
}
