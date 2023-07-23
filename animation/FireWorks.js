import FireWorksParticle from "../js/FireWorksParticle.js";
import FireWorksTail from "../js/FireWorksTail.js";
import { randomNumBetween, hypotenuse } from "../js/utils.js";

let particles = [];
let tails = [];

function init({ ctx, width, height }) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
}

const createParticles = (x, y, width, height, color) => {
  const PARTICLE_NUM = 300;

  for (let i = 0; i < PARTICLE_NUM; i++) {
    const r = randomNumBetween(2, 100) * hypotenuse(width, height) * 0.0001;
    const angle = (Math.PI / 180) * randomNumBetween(0, 360);

    const vx = r * Math.cos(angle);
    const vy = r * Math.sin(angle);
    const opacity = randomNumBetween(0.6, 0.9);
    particles.push(new FireWorksParticle(x, y, vx, vy, opacity, color));
  }
};

const createTail = (width, height) => {
  const x = randomNumBetween(width * 0.2, width * 0.8);
  const vy = height * randomNumBetween(0.01, 0.015) * -1;
  const color = "255, 255, 255";
  tails.push(new FireWorksTail(x, vy, color));
};

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#00000040";
  ctx.fillRect(0, 0, width, height);

  if (Math.random() < 0.03 && tails.length < 18) createTail(width, height);

  tails.forEach((tail, idx) => {
    tail.update();
    tail.draw();

    if (tail.vy > -0.7) {
      tails.splice(idx, 1);
      createParticles(tail.x, tail.y, width, height, tail.color);
    }
  });

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
