import ConfettiParticle from "../js/ConfettiParticle.js";

let widthAlpha = 0;
let deg = 0.1;

const particles = [];
const PARTICLE_COUNT = 20;
function init({ ctx, width, height }) {
  const x = 0;
  const y = 1;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new ConfettiParticle(x, y, -50));
  }
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#ffd9d9";
  ctx.fillRect(0, 0, width, height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].opacity < 0) particles.splice(i, 1);
  }
}

function setGUI() {}

export default { init, animate, setGUI };
