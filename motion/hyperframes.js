import {gsap} from 'gsap';

const timeline = gsap.timeline({paused: true, defaults: {duration: 3, ease: 'sine.inOut'}});
timeline
  .fromTo('.monogram', {rotation: -13, yPercent: 0}, {rotation: -5, yPercent: -7}, 0)
  .to('.monogram', {rotation: -13, yPercent: 0}, 3)
  .fromTo('.command', {rotation: 12, yPercent: 0}, {rotation: 22, yPercent: 25}, 0)
  .to('.command', {rotation: 12, yPercent: 0}, 3)
  .fromTo('.code', {rotation: -7, yPercent: 0}, {rotation: -17, yPercent: -25}, 0)
  .to('.code', {rotation: -7, yPercent: 0}, 3)
  .fromTo('.aura', {opacity: .72}, {opacity: 1}, 0)
  .to('.aura', {opacity: .72}, 3);

window.glassTimeline = timeline;

if (new URLSearchParams(location.search).has('site')) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => {
    if (document.hidden || preference.matches) timeline.pause();
    else timeline.repeat(-1).play();
  };
  preference.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}
