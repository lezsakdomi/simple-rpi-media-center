import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <MenuItem to={routes.HDMI_PLAYER} icon="tv">
        TV
      </MenuItem>
      <MenuItem to={routes.LCD_PLAYER} icon="tablet">
        képernyő
      </MenuItem>
      <MenuItem to="#" icon="th">
        kiválasztás
      </MenuItem>
      <MenuItem to={routes.SERVICE} icon="tools">
        szervíz
      </MenuItem>
    </div>
  );
}

function MenuItem(
  props: React.PropsWithChildren<{ to: string; icon: string }>
) {
  const { to, icon, children } = props;
  return (
    <Link to={to} className={styles.item}>
      <i className={`${styles.icon} fa fa-${icon}`} />
      <div className={styles.label}>{children}</div>
    </Link>
  );
}
