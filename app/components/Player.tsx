import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Player.css';
import routes from '../constants/routes.json';

export default function Player() {
  return (
    <div>
      <Link to={routes.HOME} className={styles.backButton}>
        <i className="fa fa-arrow-left" />
        Vissza
      </Link>
      <div className={styles.container}>
        <div className={styles.seek}>
          <Button icon="backward">1</Button>
          <Button icon="fast-backward">10</Button>
        </div>
        <div className={styles.playPause}>
          <Button icon="play" />
        </div>
        <div className={styles.seek}>
          <Button icon="forward">1</Button>
          <Button icon="fast-forward">10</Button>
        </div>
      </div>
    </div>
  );
}

function Button(props: React.PropsWithChildren<{ icon: string }>) {
  const { icon, children } = props;

  if (children) {
    return (
      <div className={styles.button}>
        <i className={`fa fa-${icon} fa-7x`} />
        <div className={styles.label}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.button}>
      <i className={`fa fa-${icon} fa-10x`} />
    </div>
  );
}
