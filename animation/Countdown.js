import CountdownParticle from "../js/CountdownParticle.js";

let particles = [];

function init({ ctx, width, height }) {
  const PARTICLE_NUM = 500;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new CountdownParticle());
  }
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.draw();

    if (particle.opacity < 0) {
      particles.splice(i, 1);
    }
  }
}

function setGUI() {}

export default { init, animate, setGUI };
