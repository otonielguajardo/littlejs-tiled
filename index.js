import config, { tilesetTexturePath, tilemapDataPath } from "./config.js";

'use strict';

let tileMapData = {};

async function init() {
    const response = await fetch(tilemapDataPath);
    tileMapData = await response.json();

    const levelSize = vec2(tileMapData.width, tileMapData.height);
    tileMapData.layers.forEach((currentLayer) => {
        const tileLayer = new TileLayer(vec2(), levelSize, tile(0, vec2(tileMapData.tilewidth, tileMapData.tileheight), config.textures.indexOf(tilesetTexturePath)));
        for (let x = levelSize.x; x--;) {
            for (let y = levelSize.y; y--;) {
                const pos = vec2(x, levelSize.y - 1 - y);
                const tile = currentLayer.data[y * levelSize.x + x];
                if (tile > 0) {
                    const data = new TileLayerData(tile - 1);
                    tileLayer.setData(pos, data);
                }
            }
        }
        tileLayer.redraw();
    });

    const centerX = (tileMapData.width) / 2;
    const centerY = (tileMapData.height) / 2;
    cameraPos = vec2(centerX, centerY);
}

function update() {
    cameraScale = clamp(cameraScale * (1 - mouseWheel / 10), tileMapData.tilewidth, tileMapData.tilewidth * 4);
}

function updatePost() {

}

function render() {

}

function renderPost() {
    const drawText = (text, x, y, size = 20) => {
        overlayContext.textAlign = 'left';
        overlayContext.textBaseline = 'top';
        overlayContext.font = size + 'px arial';
        overlayContext.fillStyle = '#fff';
        overlayContext.lineWidth = 3;
        overlayContext.strokeText(text, x, y);
        overlayContext.fillText(text, x, y);
    }
    drawText('Tilemap example', 10, 10);
}

engineInit(init, update, updatePost, render, renderPost, [config.textures]);