import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Mpv from 'node-mpv';
import { remote } from 'electron';
import log from 'electron-log';
import styles from './Player.css';
import routes from '../constants/routes.json';

const { dialog } = remote;

export default class Player extends React.Component<{
  screen?: number;
  fullscreen?: boolean;
  auto?: boolean;
}> {
  mpv: Mpv;

  // eslint-disable-next-line react/state-in-constructor,@typescript-eslint/no-explicit-any
  state: { status: { [key: string]: any } } = { status: {} };

  componentDidMount() {
    const { screen, fullscreen, auto } = this.props;

    const path =
      process.platform === 'win32'
        ? `${process.env.USERPROFILE}\\Videos`
        : `/media/${process.env.USER}`;

    const args = [];
    if (fullscreen) args.push('--fullscreen');
    if (typeof screen === 'number') args.push(`--screen=${screen}`);
    this.mpv = new Mpv({}, args);

    if (auto) {
      this.mpv.load(path);
    } else {
      dialog
        .showOpenDialog({
          properties: ['openDirectory', 'openFile', 'multiSelections'],
          defaultPath: path
        })
        .then(result => {
          const { canceled, filePaths } = result;

          if (!canceled) {
            for (let i = 0; i < filePaths.length; i += 1) {
              this.mpv.load(filePaths[i], 'append-play');
            }
          }
          return undefined;
        })
        .catch(e => {
          log.error(e);
        });
    }

    this.mpv.on('statuschange', (status: unknown) => {
      this.setState({ status });
    });
  }

  componentWillUnmount() {
    this.mpv.quit();
  }

  mpvPrevN(n: number) {
    for (let i = 0; i < n; i += 1) {
      this.mpv.prev();
    }
  }

  mpvNextN(n: number) {
    for (let i = 0; i < n; i += 1) {
      this.mpv.next();
    }
  }

  render() {
    const {
      status: { pause = true, path, duration }
    } = this.state;

    if (!path) {
      return (
        <div className={styles.loading}>
          <Link to={routes.HOME} className={styles.backButton}>
            <i className="fa fa-arrow-left" />
            Vissza
          </Link>
          <div className={styles.container}>Itt nincs semmi.</div>
        </div>
      );
    }

    if (!duration) {
      return (
        <div>
          <Link to={routes.HOME} className={styles.backButton}>
            <i className="fa fa-arrow-left" />
            Vissza
          </Link>
          <div className={styles.container}>
            <div className={styles.skip}>
              <Button icon="step-backward" onClick={() => this.mpvPrevN(1)}>
                1
              </Button>
              <Button icon="fast-backward" onClick={() => this.mpvPrevN(10)}>
                10
              </Button>
            </div>
            <div className={styles.playPause}>
              {pause ? (
                <Button icon="play" onClick={() => this.mpv.play()} />
              ) : (
                <Button icon="pause" onClick={() => this.mpv.pause()} />
              )}
            </div>
            <div className={styles.skip}>
              <Button icon="step-forward" onClick={() => this.mpvNextN(1)}>
                1
              </Button>
              <Button icon="fast-forward" onClick={() => this.mpvNextN(10)}>
                10
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Link to={routes.HOME} className={styles.backButton}>
          <i className="fa fa-arrow-left" />
          Vissza
        </Link>
        <div className={styles.container}>
          <div className={styles.skip}>
            <Button icon="step-backward" onClick={() => this.mpv.prev()} />
          </div>
          <div className={styles.seek}>
            <Button icon="backward" onClick={() => this.mpv.seek(-60)}>
              1
            </Button>
            <Button icon="fast-backward" onClick={() => this.mpv.seek(-600)}>
              10
            </Button>
          </div>
          <div className={styles.playPause}>
            {pause ? (
              <Button icon="play" onClick={() => this.mpv.play()} />
            ) : (
              <Button icon="pause" onClick={() => this.mpv.pause()} />
            )}
          </div>
          <div className={styles.seek}>
            <Button icon="forward" onClick={() => this.mpv.seek(60)}>
              1
            </Button>
            <Button icon="fast-forward" onClick={() => this.mpv.seek(600)}>
              10
            </Button>
          </div>
          <div className={styles.skip}>
            <Button icon="step-forward" onClick={() => this.mpv.next()} />
          </div>
        </div>
      </div>
    );
  }
}

function Button(
  props: React.PropsWithChildren<{
    icon: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }>
) {
  const { icon, onClick, children } = props;

  if (children) {
    return (
      <button type="button" className={styles.button} onClick={onClick}>
        <i className={`fa fa-${icon} fa-7x`} />
        <div className={styles.label}>{children}</div>
      </button>
    );
  }

  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <i className={`fa fa-${icon} fa-10x`} />
    </button>
  );
}
