import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './Layers.js';
import {loadBackgroundSprite} from './Sprite.js'
/* A utility functiuon to load image */
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
}
/* 
* A utility function to add JSON
*/
export function loadJSON(name) {
    return fetch(`/levelJSON/${name}.json`)
    .then(response => response.json());
}
function createTiles(level, backgrounds) {    
    backgrounds.forEach(backgorund => {
        backgorund.ranges.forEach(([x1, x2, y1, y2]) => {
            for(let x = x1; x < x2; x++) {
                for(let y = y1; y < y2; y++) {
                    level.tiles.set(x, y, {
                        name: backgorund.tiles
                    })
                }
            }
        });
    });
}
export function loadLevel(name) {
    return Promise.all([
        loadJSON('1-1'),
        loadBackgroundSprite()
    ])
    .then(([levelSpec, backgroundSprite]) => { 
        const level = new Level();
        createTiles(level, levelSpec.backgrounds);
        const backgroundLayer = createBackgroundLayer(level, backgroundSprite);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);
        console.log(level)
        return level;    
    });
}