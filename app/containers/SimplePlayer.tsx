import React from 'react';
import Player from '../components/Player';

export default function SimplePlayer() {
  const path = process.argv.length === 1 && process.argv[0];
  return <Player auto={path || true} screen={1} fullscreen />;
}
