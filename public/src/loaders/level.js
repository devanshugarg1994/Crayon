import Level from '../Level.js';
import { createBackgroundLayer, createSpriteLayer, createCollisionLayer } from '../Layers.js';
import { loadJSON, loadSpriteSheet } from '../loader.js'
import { Matrix } from '../math.js';


/*
* We combine all Json Backgrounds layer and entity layer becuae to calcualte collision we need only one grid.
*/

function setUpCollision(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);

    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);
}

function setUpBackgrounds(levelSpec, level, backgroundSprite) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprite);
        level.comp.layers.push(backgroundLayer);

    });
}

function setUpEntities(levelSpec, level, entitiesFactory) {

    levelSpec.entities.forEach(({name, pos: [x, y]}) => {
        const createEntity = entitiesFactory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        level.entities.add(entity);
    })
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
}
/* 
* A loading function which load everything needed in the level
*/
export function createLevelLoader(entitiesFactory) {
    return function loadLevel(name) {
        return loadJSON(`/levelJSON/${name}.json`)
            .then(levelSpec => Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.levelName)
            ]))
            .then(([levelSpec, backgroundSprite]) => {
                const level = new Level();
                setUpCollision(levelSpec, level);
                setUpBackgrounds(levelSpec, level, backgroundSprite);
                setUpEntities(levelSpec, level, entitiesFactory);


                return level;
            });
    }
}

// Calculating the indexes which can be used to map in the matrix as hole game is divided into the matrix.
function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield { x, y };
        }
    }
}


/* 
* calling `expandSpan` on the basis of length of range define in the JSON object
*/
function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);// Drawing tile which vary in horizontal and vertical direction

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1); // Drawing tile a SERIES OF TILE IN HORIZONTAL DIRECTION

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1); // drawing one tile
    }

}


function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}


/* 
* It is function that is used data define in JSON to create tile 
* and map them to a matrix (Need to update how it's further) 
*/
function expandTiles(tiles, patterns,) {
    /*
    *   We iterate over tiles object  define in JSON 
    *   JSON conatin the position (indexes) of the different tiles to be drawn on the screen.
    */
    const expandedTiles = [];
    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                let derivedX = x + offsetX;
                let derivedY = y + offsetY;
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    walkTiles(tiles, derivedX, derivedY);
                } else {
                    expandedTiles.push({
                        tile,
                        x: derivedX,
                        y: derivedY
                    })

                }

            }
        }
    }
    walkTiles(tiles, 0, 0);
    return expandedTiles;
}


function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, {
            type: tile.type
        });
    }
    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, {
            name: tile.name
        });
    }
    return grid;
}