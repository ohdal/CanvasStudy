import FireWorksParticle from "../js/FireWorksParticle.js";
import FireWorksSpark from "../js/FireWorksSpark.js";
import FireWorksTail from "../js/FireWorksTail.js";
import { randomNumBetween, hypotenuse } from "../js/utils.js";

let particles = [];
let tails = [];
let sparks = [];

function init({ ctx, width, height }) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
}

const createParticles = (x, y, width, height, colorDeg) => {
  const PARTICLE_NUM = 300;

  for (let i = 0; i < PARTICLE_NUM; i++) {
    const r = randomNumBetween(2, 100) * hypotenuse(width, height) * 0.0001;
    const angle = (Math.PI / 180) * randomNumBetween(0, 360);

    const vx = r * Math.cos(angle);
    const vy = r * Math.sin(angle);
    const opacity = randomNumBetween(0.6, 0.9);
    const _colorDeg = randomNumBetween(-20, 20) + colorDeg;
    particles.push(new FireWorksParticle(x, y, vx, vy, opacity, _colorDeg));
  }
};

const createTail = (width, height) => {
  const x = randomNumBetween(width * 0.2, width * 0.8);
  const vy = height * randomNumBetween(0.01, 0.015) * -1;
  const colorDeg = randomNumBetween(0, 360);
  tails.push(new FireWorksTail(x, vy, colorDeg));
};

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#00000040";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = `rgba(255, 255, 255, ${particles.length / 40000})`;
  ctx.fillRect(0, 0, width, height);

  if (Math.random() < 0.03 && tails.length < 8) createTail(width, height);

  tails.forEach((tail, idx) => {
    tail.update();
    tail.draw();

    for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
      const vx = randomNumBetween(-5, 5) * 0.05;
      const vy = randomNumBetween(-5, 5) * 0.05;
      const opacity = Math.min(-tail.vy, 0.5);
      sparks.push(new FireWorksSpark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg));
    }

    if (tail.vy > -0.7) {
      tails.splice(idx, 1);
      createParticles(tail.x, tail.y, width, height, tail.colorDeg);
    }
  });

  particles.forEach((particle, idx) => {
    particle.update();
    particle.draw();

    if (Math.random() < 0.1) sparks.push(new FireWorksSpark(particle.x, particle.y, 0, 0, 0.3, 45));

    if (particle.opacity < 0) {
      particles.splice(idx, 1);
    }
  });

  sparks.forEach((spark, idx) => {
    spark.update();
    spark.draw();

    if (spark.opacity < 0) sparks.splice(idx, 1);
  });
}

function setGUI() {}

export default { init, animate, setGUI };
