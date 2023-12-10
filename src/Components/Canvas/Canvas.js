import React, { createElement, useRef, useState } from "react";
import { useEffect } from "react";
import monoLisa from "../../Resources/sample-mid.jpg";
import Tile from "../../Utils/Tile";
import Temp from "./Temp";
import TempCss from './Canvas.module.css';

const Canvas = () => {
  const WIDTH = 480;
  const HEIGHT = 640;
  const TILE_SIDE = 32;
  const TOTAL_TILE_ROWS = HEIGHT / TILE_SIDE
  const TOTAL_TILE_COLS = WIDTH / TILE_SIDE
  const TOTAL_TILES = TOTAL_TILE_ROWS * TOTAL_TILE_COLS;

  const canvas = useRef(null);
  const [pixelsList, setPixelsList] = useState([]);
  const [tiles, setTiles] = useState([]);
  
  function doSomething(dataList, tiles) {
    for(let tile in tiles){
      let tileData = tiles[tile]["data"]
      let tileRow = Math.floor(tile / TOTAL_TILE_COLS)
      let tileCol = tile % TOTAL_TILE_COLS 
      for(let tilePixelIndex in tileData){
        let tilePixel = tileData[tilePixelIndex]
        let tilePixelRow = Math.floor(tilePixelIndex / TILE_SIDE)
        let tilePixelCol = tilePixelIndex % TILE_SIDE
        let dataListPixelIndex = 
          (tileRow * WIDTH * TILE_SIDE) + (tilePixelRow * WIDTH) + (tileCol * TILE_SIDE) + tilePixelCol
        dataListPixelIndex *= 4
        dataList[dataListPixelIndex] = tilePixel.R
        dataList[dataListPixelIndex + 1] = tilePixel.G
        dataList[dataListPixelIndex + 2] = tilePixel.B
        dataList[dataListPixelIndex + 3] = tilePixel.A
      }
    }
  }

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const image = new Image();
    image.src = monoLisa;

    image.onload = function (res) {
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
      const dataList = imageData.data;
      const pixelsList = [];
      for (let i = 0; i < dataList.length; i += 4) {
        pixelsList.push({
          I: i / 4,
          R: dataList[i],
          G: dataList[i + 1],
          B: dataList[i + 2],
          A: dataList[i + 3],
        });
      }
      let tileIndex = 0;
      const tiles = [];
      for (let i = 0; i < TOTAL_TILES; i++) {
        tiles.push(new Tile(tileIndex++, []));
      }
      for (let i = 0; i < pixelsList.length; i++) {
        let tileRow = Math.floor(i / (WIDTH * TILE_SIDE))
        let tileCol = Math.floor((i % WIDTH) / TILE_SIDE);
        let tileIndex = (tileRow * TOTAL_TILE_COLS) + tileCol
        tiles[tileIndex]["data"].push(pixelsList[i])
      }
      setPixelsList(pixelsList)
      setTiles((prev) => [...tiles])
    };
  }, [TOTAL_TILES, TOTAL_TILE_COLS]);

  async function generateTiles() {
    const ctx = canvas.current.getContext("2d");
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const dataList = imageData.data;

    let tileIndex = 0;
    const tiles = [];
    for (let i = 0; i < TOTAL_TILES; i++) {
      tiles.push(new Tile(tileIndex++, []));
    }
    
    for (let i = 0; i < pixelsList.length; i++) {
      let tileRow = Math.floor(i / (WIDTH * TILE_SIDE))
      let tileCol = Math.floor((i % WIDTH) / TILE_SIDE);
      let tileIndex = (tileRow * TOTAL_TILE_COLS) + tileCol
      tiles[tileIndex]["data"].push(pixelsList[i])
    }
    tiles.sort(() => Math.random() - 0.5)
    setTiles((prev) => [...tiles])
    doSomething(dataList, tiles)
    // ctx.putImageData(imageData, 0 ,0)
  }

  const resetTiles = () => {
    const ctx = canvas.current.getContext("2d");
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const dataList = imageData.data;
    for (let i = 0; i < pixelsList.length; i++) {
      dataList[i*4] = pixelsList[i].R
      dataList[i*4 + 1] = pixelsList[i].G
      dataList[i*4 + 2] = pixelsList[i].B
      dataList[i*4 + 3] = pixelsList[i].A
    }
    tiles.sort((a, b) => a["tileIndex"] - b["tileIndex"])
    setTiles((prev) => [...tiles])
    // ctx.putImageData(imageData, 0, 0)
  }

  return (
    <React.Fragment>
      <canvas hidden ref={canvas} width={WIDTH} height={HEIGHT} />
      <div className={TempCss["temp"]}>
        {
          tiles.map((e) => <Temp key={e.tileIndex} data={e.data} side={TILE_SIDE} /> )
        }
      </div>
      <button type="button" onClick={generateTiles}>
        Submit
      </button>
      <button type="button" onClick={resetTiles}>
        Reset
      </button>
    </React.Fragment>
  );
};

export default Canvas;
