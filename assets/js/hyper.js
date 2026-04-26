document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("hyperspace-canvas");
  const section = document.getElementById("cert");

  if (!canvas || !section) return;

  const ctx = canvas.getContext("2d");

  let stars = [];
  const starCount = 600;

  function resize() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  function createStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
      });
    }
  }

  createStars();

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    stars.forEach(star => {
      star.z -= 4;

      if (star.z <= 0) {
        star.x = Math.random() * canvas.width - canvas.width / 2;
        star.y = Math.random() * canvas.height - canvas.height / 2;
        star.z = canvas.width;
      }

      const k = 128 / star.z;
      const x = star.x * k + centerX;
      const y = star.y * k + centerY;

      const size = (1 - star.z / canvas.width) * 3;

      ctx.beginPath();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = size;
      ctx.moveTo(x, y);
      ctx.lineTo(x + (star.x * 0.02), y + (star.y * 0.02));
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }

  draw();
});