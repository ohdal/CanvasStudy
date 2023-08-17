import CanvasOption from "./CanvasOption.js";
import Vector from "./Vector.js";

export default class LopePhysicsDot extends CanvasOption {
  constructor(x, y) {
    super();

    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.gravity = new Vector(0, 0.5);
    this.friction = 0.97;
  }

  update() {
    let vel = Vector.sub(this.pos, this.oldPos);

    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction);
    vel.add(this.gravity);
    this.pos.add(vel);
  }

  draw() {
    this.ctx.fillStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
