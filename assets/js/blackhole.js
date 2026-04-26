document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("blackhole-canvas");
  const section = document.getElementById("About");

  if (!canvas || !section) return;

  const ctx = canvas.getContext("2d");

  let particles = [];
  const particleCount = 1000;

  let center = {
    x: 0,
    y: 0
  };

  function resize() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
  }

  resize();
  window.addEventListener("resize", resize);

  function createParticles() {
    particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * canvas.width / 2,
        speed: 0.005 + Math.random() * 0.02,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random()
      });
    }
  }

  createParticles();

  function draw() {
    // fade trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // spiral motion
      p.angle += p.speed;
      p.distance *= 0.992; // pull inward

      const x = center.x + Math.cos(p.angle) * p.distance;
      const y = center.y + Math.sin(p.angle) * p.distance;

      // glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        gradient.addColorStop(0, `rgba(153, 0, 0, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(80, 0, 0, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // reset when sucked in
      if (p.distance < 2) {
        p.distance = Math.random() * canvas.width / 2;
        p.angle = Math.random() * Math.PI * 2;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
});