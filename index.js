import CanvasOption from "./js/CanvasOption.js";
import * as CircleRainAnim from "./animation/CircleRain.js";
import * as FireWorksAnim from "./animation/FireWorks.js";
import * as CountdownAnim from "./animation/Countdown.js";
import * as ConfettiAnim from "./animation/Confetti.js";
import * as LopePhysicsAnim from "./animation/LopePhysics.js"

const animationList = ["CircleRain", "FireWorks", "CountDown", "Confetti", "LopePhysics"];
let animIdx = 4;

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.id = null;
  }

  init() {
    this.CANVAS_WIDTH = innerWidth;
    this.CANVAS_HEIGHT = innerHeight;

    this.canvas.width = this.CANVAS_WIDTH * this.dpr;
    this.canvas.height = this.CANVAS_HEIGHT * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.CANVAS_WIDTH + "px";
    this.canvas.style.height = this.CANVAS_HEIGHT + "px";

    this.canvasObj = {
      ctx: this.ctx,
      width: this.CANVAS_WIDTH,
      height: this.CANVAS_HEIGHT,
    };
  }

  render(anim) {
    let now, delta;
    let then = Date.now();

    if (this.id) {
      cancelAnimationFrame(this.id);
      this.ctx.restore();
    }

    if (anim) {
      this.clearCanvas();
      this.init();
      this.ctx.save();
      anim.default.init(this.canvasObj);
    } else {
      return;
    }

    const frame = () => {
      this.id = requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;

      anim.default.animate(this.canvasObj);

      then = now - (delta % this.interval);
    };

    this.id = requestAnimationFrame(frame);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }
}

function createButton() {
  const btnLayout = document.querySelector("#btn-layout");
  const buttonList = [];

  function buttonToggle(pre, cur) {
    buttonList[pre].classList.remove("clicked");
    buttonList[cur].classList.add("clicked");
    animIdx = cur;
  }

  animationList.forEach((v, idx) => {
    const el = document.createElement("button");
    el.innerText = v;
    el.addEventListener("click", () => {
      buttonToggle(animIdx, idx);
      animationChange();
    });

    buttonList.push(el);
    btnLayout.appendChild(el);
  });
}

function animationChange() {
  document.body.id = "";

  switch (animationList[animIdx]) {
    case "CircleRain":
      canvas.render(CircleRainAnim);
      // CircleRainAnim.default.setGUI();
      document.body.id = "circleRain";
      break;
    case "FireWorks":
      canvas.render(FireWorksAnim);
      document.body.id = "fireWorks";
      break;
    case "CountDown":
      canvas.render(CountdownAnim);
      document.body.id = "countdown";
      break;
    case "Confetti":
      canvas.render(ConfettiAnim);
      document.body.id = "confetti";
      break;
    case "LopePhysics":
      canvas.render(LopePhysicsAnim);
      document.body.id = "lopePhysics";
      break;
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  createButton();
  canvas.init();
  animationChange();
});

window.addEventListener("resize", () => {
  canvas.init();
});
