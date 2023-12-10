import React, { useRef, useEffect } from "react";
import TempCss from './Canvas.module.css'

function Temp(props) {
  const canvas = useRef(null);

  useEffect(() => {
    canvas.width = props.side;
    canvas.height = props.side;
    const ctx = canvas.current.getContext("2d");
    let imgData = ctx.createImageData(props.side, props.side);
    for(let i = 0; i < props.data.length; i++) {
        imgData.data[i*4+0] = props.data[i].R;
        imgData.data[i*4+1] = props.data[i].G;
        imgData.data[i*4+2] = props.data[i].B;
        imgData.data[i*4+3] = props.data[i].A;
    }
    ctx.putImageData(imgData, 0, 0);
  });

  return (
    <canvas className={TempCss["tempCanvas"]} ref={canvas} width={props.side} height={props.side} />
  )
}

export default Temp