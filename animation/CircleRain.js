import { randomNumBetween } from "../js/utils.js";
import CircleRainParticle from "../js/CircleRainParticle.js";

let particles = [];

/* init 함수 - 파티클 생성 */
function init({width, height}) {
  const PARTICLE_NUM = width / 15;

  particles = [];
  for (let i = 0; i < PARTICLE_NUM; i++) {
    const x = randomNumBetween(0, width);
    const y = randomNumBetween(0, height);
    const vy = randomNumBetween(1, 5);
    const radius = randomNumBetween(10, 130);
    particles.push(new CircleRainParticle(x, y, radius, vy));
  }
}

/* animate 함수 - animation 진행 */
function animate({width, height}) {
  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y > height + particle.radius) {
      particle.y = -particle.radius * 2;
      particle.x = randomNumBetween(0, width);
      particle.radius = randomNumBetween(10, 130);
      particle.vy = randomNumBetween(1, 5);
    }
  });
}

/* setGUI 함수 - dat.GUI를 이용한 animation값 조절 */
function setGUI() {
  const feGaussianBlur = document.querySelector("feGaussianBlur");
  const feColorMatrix = document.querySelector("feColorMatrix");

  const controls = new (function () {
    this.blurValue = 40;
    this.alphaChannel = 100;
    this.alphaOffset = -20;
    this.acc = 1.03;
  })();

  let gui = new dat.GUI();

  const f1 = gui.addFolder("Gooey Effect");
  f1.open();
  f1.add(controls, "blurValue", 0, 100).onChange((value) => {
    feGaussianBlur.setAttribute("stdDeviation", value);
  });

  f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
    feColorMatrix.setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`);
  });

  f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
    feColorMatrix.setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`);
  });

  const f2 = gui.addFolder("Particle Property");
  f2.open();
  f2.add(controls, "acc", 1, 1.5, 0.01).onChange((value) => {
    particles.forEach((particle) => {
      particle.acc = value;
    });
  });
}

export default { init, animate, setGUI };
