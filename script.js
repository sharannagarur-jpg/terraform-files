// Subtle looping animation on the hero oscilloscope: the "soft switch" trace
// gently breathes to suggest a live measurement, while the "hard switch"
// square wave stays static as a reference line.
(function () {
  const softWave = document.querySelector('.wave-soft');
  if (!softWave || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let t = 0;
  function animate() {
    t += 0.02;
    const offset = Math.sin(t) * 3;
    softWave.style.transform = `translateY(${offset}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// Active nav link highlighting based on scroll position
(function () {
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();
