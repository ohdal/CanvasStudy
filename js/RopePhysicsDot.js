import CanvasOption from "./CanvasOption.js";
import Vector from "./Vector.js";

export default class RopePhysicsDot extends CanvasOption {
  constructor(x, y) {
    super();

    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.gravity = new Vector(0, 0.5);
    this.friction = 0.97;

    this.pinned = false;
    this.isLast = false;

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

    const dist = Math.sqrt(dx * dx + dy * dy); // 마우스와 점사이 거리 구하기
    const direction = new Vector(dx / dist, dy / dist); // 방향 벡터 구하기

    // 0 ~ 1 dot에 가까울수록 1에 가까운 값
    // 거리 마이너스 최소값 0 처리
    const force = Math.max((mouse.radius - dist) / mouse.radius, 0);

    if (force > 0.6) this.pos.setXY(mouse.pos.x, mouse.pos.y);
    else this.pos.add(direction.mult(force).mult(4));
  }

  draw() {
    const lastSize = this.mass * 5;

    this.ctx.fillStyle = this.isLast ? "#fbe95e" : "#999";
    if (this.isLast) {
      this.ctx.arc(this.pos.x, this.pos.y + lastSize, lastSize, 0, (Math.PI / 180) * 360);
      this.ctx.fill();
    } else this.ctx.fillRect(this.pos.x - this.mass, this.pos.y - this.mass, this.mass * 2, this.mass * 2);
  }
}
