import Mouse from "../js/Mouse.js";
import Rope from "../js/RopePhysicsRope.js";

let ropes = [];
let mouse = null;
function init({ width, height }) {
  mouse = new Mouse();

  ropes = [];
  const rope_1 = new Rope({ x: 100, y: 100 });
  ropes.push(rope_1);
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  ropes.forEach((rope) => {
    rope.update(mouse);
    rope.draw();
  });
}

function setGUI() {}

export default { init, animate, setGUI };
