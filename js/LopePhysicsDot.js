import CanvasOption from "./CanvasOption.js";
import Vector from "./Vector.js";

export default class LopePhysicsDot extends CanvasOption {
  constructor(x, y) {
    super();

    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.gravity = new Vector(0, 0.5);
    this.friction = 0.97;

    this.pinned = false;

    this.mass = 1;
  }

  update(mouse) {
    if (this.pinned) return;

    let vel = Vector.sub(this.pos, this.oldPos);

    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction);
    vel.add(this.gravity);
    this.pos.add(vel);

    if (!mouse.isClick) return;

    let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);

    const dist = Math.sqrt(dx * dx, dy * dy); // 마우스와 점사이 거리 구하기

    if (dist > mouse.radius) return;

    const direction = new Vector(dx / dist, dy / dist); // 방향 벡터 구하기
    const force = (mouse.radius - dist) / mouse.radius; // 0 ~ 1 dot에 가까울수록 1에 가까운 값

    if (force > 0.8) this.pos.setXY(mouse.pos.x, mouse.pos.y);
    else this.pos.add(direction.mult(force).mult(5));
  }

  draw() {
    this.ctx.fillStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
