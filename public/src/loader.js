import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './Layers.js';
import SpriteSheet from './SpriteSheet.js'


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
export function loadJSON(url) {
    return fetch(url)
    .then(response => response.json());
}
/* 
* A utility function to load SpriteSheet 
*/
export function loadSpriteSheet(name) {
    return loadJSON(`/sprites/${name}.json`)
        .then(sheetSpec => 
            Promise.all([
                sheetSpec,
                loadImage(sheetSpec.imageURL)
            ]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
            sheetSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);

            });

            return sprites;
        })


}

/* 
* It is function that is used data define in JSON to create tile and map them to a matrix (Need to update how it's further) 
*/
function createTiles(level, backgrounds) {
    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                level.tiles.set(x, y, {
                    name: background.tiles,
                });
            }
        }
    }
    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);

            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);

            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
}

/* 
* A loading function which load everything needed in the level
*/
export function loadLevel(name) {
    return  loadJSON(`/levelJSON/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.levelName)
    ]))
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