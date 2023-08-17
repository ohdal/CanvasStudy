import CanvasOption from "./CanvasOption.js";

export default class LopePhysicsStick extends CanvasOption {
  constructor(p1, p2) {
    super();

    this.startPoint = p1;
    this.endPoint = p2;

    this.length = this.startPoint.pos.dist(this.endPoint.pos);

    // 탄성
    this.tension = 0.05;
  }

  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy = this.endPoint.pos.y - this.startPoint.pos.y;

    // dist - endPoint(dot)의 y값이 커짐에 길어지는 거리 값
    // diff - 차이값과 dist 비율 구하기
    const dist = Math.sqrt(dx * dx + dy * dy);
    const diff = (dist - this.length) / dist;

    /* diff * dx 부분 설명
    현재 x, y의 값에 비율(diff)을 곱함으로써 차이값을 구할 수 있음 */

    /*  값 * this.tention 부분 설명
    기준점에서 중력만 적용된다면 도달해야할 위치보다 가까운 위치로 이동시키게 함으로써
    stick이 고무같이 탄성이 있는것처럼 효과를 줄수 있음.
    (도달해야할 위치의 반대로 땡긴다고 생각하면 된다. 즉 tension이 1이라면 효과 x) */
    const offsetX = diff * dx * this.tension;
    const offsetY = diff * dy * this.tension;

    // Point(dot)의 무게에 따라 위치가 달라짐 - 무거운쪽으로 더 치우쳐야 한다.
    const m = this.startPoint.mass + this.endPoint.mass;
    const m1 = this.endPoint.mass / m;
    const m2 = this.startPoint.mass / m;

    // 고정되지 않은 Point만 적용
    if (!this.startPoint.pinned) {
      this.startPoint.pos.x += offsetX * m2;
      this.startPoint.pos.y += offsetY * m2;
    }

    if (!this.endPoint.pinned) {
      this.endPoint.pos.x -= offsetX * m2;
      this.endPoint.pos.y -= offsetY * m2;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 10;
    this.ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    this.ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
