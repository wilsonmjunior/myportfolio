import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const duration = 180;
const colors = ['#f6b5e9', '#bb8fff', '#8ce9db'];

function KurioMotion() {
  const phase = (useCurrentFrame() / duration) * 2 * Math.PI;
  return <AbsoluteFill style={{overflow: 'hidden', background: 'radial-gradient(ellipse at 65% 78%, #6a3d85, #332042 68%)'}}>
    {colors.map((color, index) => {
      const offset = phase + index * 2 * Math.PI / 3;
      return <div key={color} style={{
        position: 'absolute', left: 255 + Math.cos(offset) * 103, top: 108 + Math.sin(offset) * 48,
        width: 132, height: 132, borderRadius: 32, opacity: .65 + Math.sin(offset) * .22,
        transform: 'translate(-50%, -50%) rotate(' + (25 + Math.cos(offset) * 22) + 'deg)',
        background: 'linear-gradient(145deg, ' + color + ', #27153d)',
        border: '1px solid ' + color, boxShadow: 'inset 0 2px 5px #fff8, 0 14px 26px #1c0e38aa',
      }} />;
    })}
  </AbsoluteFill>;
}

const mount = document.getElementById('kurio-motion');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const root = createRoot(mount);
let onScreen = false;

function sync() {
  if (preference.matches || !onScreen || document.hidden) {
    root.render(null);
    return;
  }
  root.render(<Player component={KurioMotion} durationInFrames={duration} fps={30}
    compositionWidth={480} compositionHeight={220} autoPlay loop
    style={{width: '100%', height: '100%'}} />);
}

new IntersectionObserver(([entry]) => {
  onScreen = entry.isIntersecting;
  sync();
}).observe(mount);
preference.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
