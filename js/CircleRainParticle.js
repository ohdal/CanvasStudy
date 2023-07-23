import CanvasOption from "./CanvasOption.js";

export default class CircleRainParticle extends CanvasOption {
  constructor(x, y, radius, vy) {
    super();

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
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); // radian
    this.ctx.fillStyle = "#fff08b";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
