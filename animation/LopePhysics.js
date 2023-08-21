import Mouse from "../js/Mouse.js";
import Dot from "../js/LopePhysicsDot.js";
import Stick from "../js/LopePhysicsStick.js";

let dots = [];
let sticks = [];
let mouse = null;
function init({ width, height }) {
  mouse = new Mouse();

  dots = [new Dot(100, 100), new Dot(300, 300), new Dot(400, 400)];
  sticks = [new Stick(dots[0], dots[1]), new Stick(dots[1], dots[2])];

  dots[0].pinned = true;
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  dots.forEach((dot) => {
    dot.update(mouse);
  });

  sticks.forEach((stick) => {
    stick.update();
  });

  dots.forEach((dot) => {
    dot.draw();
  });

  sticks.forEach((stick) => {
    stick.draw();
  });
}

function setGUI() {}

export default { init, animate, setGUI };
