export var delay = function(time){
  return new Promise((resolve) => {setTimeout(() => {resolve()}, time)})
}

function createCanvasFromRGBAData(data, width, height) {
  // `data` should look something like [[123,32,40,255], [3,233,42,120], ...]
  if(width*height !== data.length) throw new Error("width*height should equal data.length");
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  let imgData = ctx.createImageData(width, height);
  for(let i = 0; i < data.length; i++) {
    imgData.data[i*4+0] = data[i][0];
    imgData.data[i*4+1] = data[i][1];
    imgData.data[i*4+2] = data[i][2];
    imgData.data[i*4+3] = data[i][3];
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}