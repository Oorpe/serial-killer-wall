// body.onload(function(){
//   var canvas = document.querySelector("#canvas");
//   canvas.width = body.
// })

function canvas(id){
  initCanvas(id);

}

var positions = {
  down: {x: 0, y:0},
  up: {x: 0, y:0},
  current: {x:0, y:0},
  drawing: false
}
//global drawng context
var ctx;

// function stateStore(initial){
//   var _this = this;
//   this.state = initial;
//   this.setState()
//   return this;
// }

function initCanvas(id){
  var c = document.querySelector(id);
  console.log(c);
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx = c.getContext("2d");
  c.onmousedown = onMouseDown;
  c.onmousemove = onMouseOver;
  c.onmouseup = onMouseUp;
  c.onmouseleave = onMouseUp;
}

function onMouseDown(e){
  console.log(e);
  positions.down.x = e.clientX;
  positions.down.y = e.clientY;//store start point of line
  positions.drawing = true;
  // ctx.moveTo(e.clientX, e.clientY)
  // ctx.lineTo
}

function onMouseUp(e){
positions.drawing = false;

}

function onMouseOver(e){
  if(positions.drawing){
    ctx.clear();
    ctx.moveTo(positions.down.x, positions.down.y);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.closePath()
    ctx.stroke()
  }

  // window.requestAnimationFrame(onMouseOver);
}
