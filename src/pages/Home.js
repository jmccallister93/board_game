import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";

import "../pages/Canvas.css"

import desert from "../assets/desert01.jpg"
import forest from "../assets/forest.png"
import grass from "../assets/grass.png"
import jungle from "../assets/jungle.png"
import lava from "../assets/lava.png"
import snow from "../assets/snow01.jpg"
import oasis from "../assets/oasis01.jpg"

const Home = () => {
  const canvasRef = useRef(null);
  const [seed, setSeed] = useState(Math.random() * 1000);
  const [theme, setTheme] = useState("grass");
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [tileOptions, setTileOptions] = useState([]);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [tileSizing, setTileSizing] = useState(60)
  const [p5Instance, setP5Instance] = useState(null);

  const exportCanvasAsImage = () => {
    if (p5Instance) {
      p5Instance.saveCanvas('myCanvas', 'jpg');
    }
  };
  
  // Set ReRender
  const rerender = () => {
    setSeed(Math.random() * 1000);
  };

  // Main UseEffect
  useEffect(() => {
    const sketch = (p) => {
        let desertImg, forestImg, grassImg, jungleImg, snowImg, oasisImg, lavaImg;

        //   Preload images
        p.preload = () => {
            desertImg = p.loadImage(desert);
            forestImg = p.loadImage(forest);
            grassImg = p.loadImage(grass);
            jungleImg = p.loadImage(jungle);
            snowImg = p.loadImage(snow);
            oasisImg = p.loadImage(oasis);
            lavaImg = p.loadImage(lava);
        };

        // Setup canvas
        p.setup = () => {
            p.createCanvas(width, height);
            p.noLoop();
            p.noiseSeed(seed);
            p5Instance && p5Instance.remove(); // Remove the old canvas when width or height changes
            setP5Instance(p);
        };

        // Draw everything
        p.draw = () => {
            p.background(255);

            const tileSize = tileSizing;
            for (let x = 0; x * tileSize < width; x++) {
                for (let y = 0; y * tileSize < height; y++) {
                    const randVal = p.random();

                    if (randVal < 0.05) {
                        p.image(oasisImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    } else if (randVal < 0.1) {
                        p.image(lavaImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    }else if (randVal < 0.2) {
                        p.image(desertImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    } else if (randVal < 0.4) {
                        p.image(grassImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    } else if (randVal < 0.6) {
                        p.image(jungleImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    } else if (randVal < 0.8) {
                        p.image(snowImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    } else if (randVal < 1) {
                        p.image(forestImg, x * tileSize, y * tileSize, tileSize, tileSize);
                    } 
                }
            }
        };
    };

    const myp5 = new p5(sketch, canvasRef.current);
    return () => {
        myp5.remove();
    };
}, [seed, width, height, tileSizing]);


  

  return (
    <div className="canvasWrapper">
      <div className="optionsContainer">
        {/* Rerender */}
        <button className="generateButton" onClick={rerender}>Generate</button>
        {/* Height and Width */}
        <div className="optionWrapper">
          <label className="optionLabel">
            Canvas Width:
            <select value={width} onChange={(e) => setWidth(e.target.value)}>
              <option value="1920">1920px</option>
              <option value="1440">1440px</option>
              <option value="1280">1280px</option>
              <option value="1080">1080px</option>
              <option value="720">720px</option>
            </select>
          </label>
        </div>
        <div className="optionWrapper">
          <label className="optionLabel">
            Canvas Height:
            <select value={height} onChange={(e) => setHeight(e.target.value)}>
              <option value="1920">1920px</option>
              <option value="1440">1440px</option>
              <option value="1280">1280px</option>
              <option value="1080">1080px</option>
              <option value="720">720px</option>
            </select>
          </label>
        </div>
        <div className="optionWrapper">
          <label className="optionLabel">
            Tile Size:
            <select value={tileSizing} onChange={(e) => setTileSizing(e.target.value)}>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="110">110</option>

            </select>
          </label>
        </div>
        <button className="generateButton" onClick={exportCanvasAsImage}>Export Image</button>

      </div>

      <div className="canvasContianer">
        <div ref={canvasRef}></div>
      </div>
    </div>
  );
};

export default Home;
