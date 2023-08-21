import Mouse from "../js/Mouse.js";
import Rope from "../js/RopePhysicsRope.js";

import { randomNumBetween } from "../js/utils.js";

let ropes = [];
let mouse = null;
function init({ width, height }) {
  const TOTAL = width * 0.06;
  mouse = new Mouse();

  ropes = [];

  for (let i = 0; i < (TOTAL > 10 ? 10 : TOTAL); i++) {
    ropes.push(
      new Rope({
        x: randomNumBetween(width * 0.2, width * 0.8),
        y: 120,
        gap: randomNumBetween(height * 0.05, height * 0.08),
      })
    );
  }
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#1F1F1F";
  ctx.fillRect(0, 0, width, height);

  ropes.forEach((rope) => {
    rope.update(mouse);
    rope.draw();
  });
}

function setGUI() {}

export default { init, animate, setGUI };
