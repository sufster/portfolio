
const canvas = document.getElementById("proj-fluid");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = document.getElementById("proj").offsetHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: Math.random() * 0.6 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (let p of particles) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,180,255,0.25)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    // movement (ocean drift)
    p.x += p.dx;
    p.y += p.dy;

    // reset
    if (p.y > h) {
      p.y = 0;
      p.x = Math.random() * w;
    }
    if (p.x > w || p.x < 0) p.dx *= -1;
  }

  requestAnimationFrame(draw);
}

draw();