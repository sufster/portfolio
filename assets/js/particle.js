document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.particles-tech').forEach(el => {
    particleground(el, {
      dotColor: '#660000',
      lineColor: '#990000'
    });
  });
});


;(function(window, document) {
  "use strict";
  var pluginName = 'particleground';

  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = extend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  }

  var $ = window.jQuery;

  function Plugin(element, options) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = 0;
    var mouseY = 0;
    var raf;
    var paused = false;

    options = extend({}, window[pluginName].defaults, options);

    function init() {
      if (!ctx) return;

      canvas.className = 'pg-canvas';
      element.insertBefore(canvas, element.firstChild);
      resize();

      var numParticles = Math.round((canvas.width * canvas.height) / options.density);
      for (var i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }

      window.addEventListener('resize', resize);
      document.addEventListener('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      });

      draw();
    }

    function resize() {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      ctx.fillStyle = options.dotColor;
      ctx.strokeStyle = options.lineColor;
      ctx.lineWidth = options.lineWidth;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      if (!paused) raf = requestAnimationFrame(draw);
    }

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * options.maxSpeedX;
      this.vy = (Math.random() - 0.5) * options.maxSpeedY;
    }

    Particle.prototype.update = function() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, options.particleRadius, 0, Math.PI * 2);
      ctx.fill();

      for (var i = 0; i < particles.length; i++) {
        var p2 = particles[i];
        var dx = this.x - p2.x;
        var dy = this.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < options.proximity) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    };

    init();

    return {
      pause: function() { paused = true; },
      start: function() { paused = false; draw(); }
    };
  }

  window[pluginName] = function(elem, options) {
    return new Plugin(elem, options);
  };

  window[pluginName].defaults = {
    maxSpeedX: 0.7,
    maxSpeedY: 0.7,
    density: 10000,
    dotColor: '#7E191B',
    lineColor: '#990000',
    particleRadius: 2,
    lineWidth: 1,
    proximity: 100
  };

})(window, document);


// requestAnimationFrame fallback
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();