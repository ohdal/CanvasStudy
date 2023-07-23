import FireWorksParticle from "../js/FireWorksParticle.js";
import { randomNumBetween, hypotenuse } from "../js/utils.js";

let particles = [];

function init({ width, height }) {
  const PARTICLE_NUM = 300;

  particles = [];

  const x = randomNumBetween(0, width);
  const y = randomNumBetween(0, height);

  for (let i = 0; i < PARTICLE_NUM; i++) {
    const r = randomNumBetween(2, 100) * hypotenuse(width, height) * 0.0001;
    const angle = (Math.PI / 180) * randomNumBetween(0, 360);

    const vx = r * Math.cos(angle);
    const vy = r * Math.sin(angle);
    const opacity = randomNumBetween(0.6, 0.9);
    particles.push(new FireWorksParticle(x, y, vx, vy, opacity));
  }
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#00000040";
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
