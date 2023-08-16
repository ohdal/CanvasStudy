import CountdownParticle from "../js/CountdownParticle.js";

const CIRCLE_RADIUS = innerHeight / 4;

const img = new Image();
let img_opacity = 1;
let particles = [];

function init({ ctx, width, height }) {
  img_opacity = 1;
  img.src = "assets/img_countdown.png";
  
  const PARTICLE_NUM = 500;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new CountdownParticle(CIRCLE_RADIUS));
  }
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  if (particles.length > 0) {
    if (img_opacity > 0) {
      img_opacity -= 0.02;
      ctx.globalAlpha = img_opacity;

      if (ctx.globalAlpha !== 1)
        ctx.drawImage(img, width / 2 - CIRCLE_RADIUS, height / 2 - CIRCLE_RADIUS, CIRCLE_RADIUS * 2, CIRCLE_RADIUS * 2);
    }

    ctx.globalAlpha = 1;
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.update();
      particle.draw();

      if (particle.opacity < 0) {
        particles.splice(i, 1);
      }
    }
  }
}

function setGUI() {}

export default { init, animate, setGUI };
