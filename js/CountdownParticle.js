import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class CountdownParticle extends CanvasOption {
  constructor(r) {
    super();

    this.opacity = randomNumBetween(0.2, 1);

    this.rFriction = randomNumBetween(0.95, 1.01);
    this.rAlpha = randomNumBetween(0, 5);
    this.r = r;

    this.angleFriction = randomNumBetween(0.97, 0.99);
    this.angleAlpha = randomNumBetween(1, 2);
    this.angle = randomNumBetween(0, 360);
  }

  update() {
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha;

    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha;

    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

    this.opacity -= 0.005;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
