import LopePhysicsDot from "../js/LopePhysicsDot.js";

const dots = [];
function init({ width, height }) {
  dots.push(new LopePhysicsDot(400, 50));
}

function animate({ ctx, width, height }) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  for (let i = dots.length - 1; i >= 0; i--) {
    const dot = dots[i];
    dot.update();
    dot.draw();

    if (dot.pos.x > width || dot.pos.y > height) dots.splice(i, 1);
  }
}

function setGUI() {}

export default { init, animate, setGUI };
