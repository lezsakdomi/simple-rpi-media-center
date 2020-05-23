import React from 'react';
import { shell } from 'electron';
import { exec } from 'child_process';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default class ManualPlayer extends React.Component {
  componentDidMount() {
    const path =
      process.platform === 'win32'
        ? `${process.env.USERPROFILE}\\Videos`
        : `/media/${process.env.USER}`;

    shell.openItem(path);

    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => exec('xdotool key F11 alt+F11'), 500);
    }
  }

  render() {
    return (
      <div
        style={{
          fontSize: '10rem',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left" style={{ marginRight: '0.2em' }} />
          Vissza
        </Link>
      </div>
    );
  }
}
