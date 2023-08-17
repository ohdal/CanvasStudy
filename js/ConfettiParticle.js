import CanvasOption from "./CanvasOption.js";
import { randomNumBetween, hexToRgb } from "./utils.js";

export default class ConfettiParticle extends CanvasOption {
  constructor(x, y, deg = 0, colors) {
    super();

    this.angle = (Math.PI / 180) * randomNumBetween(deg - 30, deg + 30);
    this.radius = randomNumBetween(30, 100);
    this.x = x * innerWidth;
    this.y = y * innerHeight;

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.friction = 0.92;
    this.gravity = 0.5;

    this.width = 20;
    this.height = 20;

    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);

    this.colors = colors || ["#FF577F", "#FF8848", "#FFD384", "#FFF9B0"];
    this.color = hexToRgb(this.colors[Math.floor(randomNumBetween(0, this.colors.length - 1))]);
  }

  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.005;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.rotation += this.rotationDelta;
  }

  draw() {
    this.ctx.translate(this.x + this.width, this.y + this.height); // 컨버스 자체의 위치를 이동시킨다.
    this.ctx.rotate((Math.PI / 180) * this.rotation); // 컨버스 자체를 회전시킨다.
    this.ctx.translate(-this.x - this.width, -this.y - this.height); // 중첩되어 점점 커지기 떄문에 뺴준다.

    this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    this.ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    const dpr = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio;

    if (dpr > 1) this.ctx.scale(dpr, dpr);
  }
}
