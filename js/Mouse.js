import CanvasOption from "./CanvasOption.js";
import Vector from "./Vector.js";

export default class Mouse extends CanvasOption {
  constructor() {
    super();

    // 시작하자마자 해당 위치의 dot과 상호작용하지 않기 위해
    // 안전하게 -1000 값으로 초기화 시킨다.
    this.pos = new Vector(-1000, -1000);
    this.radius = 50;
    this.isClick = false;

    this.canvas.onmousedown = () => (this.isClick = true);
    this.canvas.onmouseup = () => (this.isClick = false);

    this.canvas.onmousemove = (e) => {
      if (!this.isClick) return;
      this.pos.setXY(e.clientX, e.clientY);
    };

    this.canvas.ontouchmove = (e) => {
      if (!this.isClick) return;
      this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
    };
  }
}
