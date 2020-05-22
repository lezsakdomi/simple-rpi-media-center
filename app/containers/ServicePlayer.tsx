import React from 'react';
import { remote, BrowserWindow } from 'electron';
import Player from '../components/Player';

export default class ServicePlayer extends React.Component {
  window?: BrowserWindow;

  wasFullScreen?: boolean;

  componentDidMount() {
    const window = remote.getCurrentWindow();
    const wasFullScreen = window.isFullScreen();

    window.setFullScreen(false);

    this.window = window;
    this.wasFullScreen = wasFullScreen;
  }

  componentWillUnmount() {
    if (this.wasFullScreen)
      (this.window as BrowserWindow).setFullScreen(this.wasFullScreen);
  }

  render() {
    return <Player />;
  }
}
