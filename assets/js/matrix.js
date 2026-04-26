document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const section = canvas.parentElement;
  const ctx = canvas.getContext("2d");

  const letters = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 20;

  let columns;
  let drops = [];

  function resize() {
    const rect = section.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    columns = Math.floor(canvas.width / fontSize);

    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }
  }

  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));

      ctx.fillText(text, i * fontSize, drops[i]);

      if (drops[i] > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += fontSize;
    }

    requestAnimationFrame(draw);
  }

  draw();
});