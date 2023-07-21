const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = innerWidth;
const CANVAS_HEIGHT = innerHeight;
const dpr = window.devicePixelRatio;

canvas.style.width = CANVAS_WIDTH + "px";
canvas.style.height = CANVAS_HEIGHT + "px";

canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;
ctx.scale(dpr, dpr);

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

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.acc = 1.04;
    this.radius = radius;
  }

  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); // radian
    ctx.fillStyle = "#fff08b";
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const TOTAL = 30;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, CANVAS_WIDTH);
  const y = randomNumBetween(0, CANVAS_HEIGHT);
  const vy = randomNumBetween(1, 5);
  const radius = randomNumBetween(10, 130);
  particles.push(new Particle(x, y, radius, vy));
}

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  // 디바이스 주사율마다 다르다.
  // 144hz == 1초에 144번 실행
  window.requestAnimationFrame(animate);

  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y > CANVAS_HEIGHT + particle.radius) {
      particle.y = -particle.radius * 2;
      particle.x = randomNumBetween(0, CANVAS_WIDTH);
      particle.radius = randomNumBetween(10, 130);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

animate();
