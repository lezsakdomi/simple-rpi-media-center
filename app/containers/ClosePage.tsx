import React from 'react';
import { remote } from 'electron';

export default class ClosePage extends React.Component {
  componentDidMount() {
    const { app } = remote;
    app.quit();
  }
}
