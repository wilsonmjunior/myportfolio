const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const targets = document.querySelectorAll('.section h2, .card, .experience, .education, .contact');
const animations = new Set();

function enter(element, offset = 16, duration = 420) {
  const animation = element.animate(
    [{ opacity: .72, translate: '0 ' + offset + 'px' }, { opacity: 1, translate: '0 0' }],
    { duration, easing: 'cubic-bezier(.2,.65,.3,1)' },
  );
  animations.add(animation);
  animation.addEventListener('finish', () => animations.delete(animation), { once: true });
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    if (!reducedMotion.matches) enter(entry.target);
  }
}, { threshold: .12 });

function syncMotion() {
  if (reducedMotion.matches) {
    observer.disconnect();
    for (const animation of animations) animation.cancel();
    animations.clear();
    return;
  }

  for (const target of targets) {
    if (target.getBoundingClientRect().top >= innerHeight) observer.observe(target);
  }
}

if (!reducedMotion.matches && scrollY < 40) enter(document.querySelector('.intro'), 12, 560);
reducedMotion.addEventListener('change', syncMotion);
syncMotion();
