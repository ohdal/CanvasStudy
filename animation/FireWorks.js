import FireWorksParticle from "../js/FireWorksParticle.js";
import { randomNumBetween } from "../js/utils.js";

let particles = [];

function init({ width, height }) {
  const PARTICLE_NUM = 10;

  particles = [];

  const x = randomNumBetween(0, width);
  const y = randomNumBetween(0, height);

  for (let i = 0; i < PARTICLE_NUM; i++) {
    const vx = randomNumBetween(-5, 5);
    const vy = randomNumBetween(-5, 5);
    particles.push(new FireWorksParticle(x, y, vx, vy));
  }
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  particles.forEach((particle, idx) => {
    particle.update();
    particle.draw();

    if (particle.opacity < 0) {
      particles.splice(idx, 1);
    }
  });
}

function setGUI() {}

export default { init, animate, setGUI };
