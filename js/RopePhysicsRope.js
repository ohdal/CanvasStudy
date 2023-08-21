import Dot from "./RopePhysicsDot.js";
import Stick from "./RopePhysicsStick.js";

export default class RopePhysicsRope {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.segments = config.segments || 10; // 점의 갯수
    this.gap = config.gap || 50; // 점과 점 사이의 거리
    this.iterations = config.iterations || 10;

    this.dots = [];
    this.sticks = [];

    this.create();
  }

  create() {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap));
    }

    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }

    this.dots[0].pinned = true;
    this.dots[this.segments - 1].isLast = true;
  }

  update(mouse) {
    this.dots.forEach((dot) => {
      dot.update(mouse);
    });

    // 한프레임에 점과 선의 업데이트가 다 반영이 되지 못하면
    // 다음 프레임에 부수효과(side effect)가 발생하게 된다.
    // 점들의 위치에 영향을 주게되는 Stick Class의 update를
    // 적당히 더 많이 실행 시켜준다. (강사님 피셜 10번이 적당함)
    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach((stick) => {
        stick.update();
      });
    }
  }

  draw() {
    this.dots.forEach((dot) => {
      dot.draw();
    });

    this.sticks.forEach((stick) => {
      stick.draw();
    });
  }
}
