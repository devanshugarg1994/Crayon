import TileResolver from "./TileResolver.js";

/* 
* Here we are creating a HOF for backgound layer using pre-rendering.
* @param level -- a instance of the level which coantin basic information about level
* ex:- layering, entities in the level and 
* 
* sprite ---- refernce to loaded image which refer to draw (Basic tile)
*/
export function createBackgroundLayer(level, tiles, sprites) {
    // TODO rename the buffer as sceneBuffer

    const resolver = new TileResolver(tiles);
    const buffer = document.createElement("canvas");
    buffer.width = 256 + 16;
    buffer.height = 240;
    const context = buffer.getContext("2d");
    /* 
    * A private function which is used to draw tiles (store in sprites object)
    * on buffer (actual scene formed using matrix data and buffer)
    * As Camera position change we change the data in buffer and then redraw the background
    * 
    */

    function redraw(startIndex, endIndex) {
        context.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);

                    } else {
                        sprites.drawTiles(tile.name, context, x - startIndex, y)
                    }
                });
            }
        }
    }

    /*  Returning Draw function that will actually draw it on the screen
    *   @param context --- draw the image w.r.t to passed context
    */
    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        // actual drawing on the screen.
        context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
    }
}

/* 
* Draw simple entity on screen 
* @param entity --- passed the instance of entity that we need draw
*/
export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');
    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);
            entity.draw(spriteBufferContext);
            context.drawImage(spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });
    }
}

/* 
* Create a HOC function 
*/
export function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;
    // Overrided the functon to store position when it call a every frame from Level class from update method
    // We are storing position of entity (mario) at every frame and then calling original function.
    tileResolver.getByIndex = function getByIndexfake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }
    // function return is called by Level class as we add the layer
    // in comp instance of Compositor Class in Level Class
    return function drawCollision(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect((x * tileSize) - camera.pos.x,
                (y * tileSize) - camera.pos.y,
                tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.bounds.left - camera.pos.x,
                entity.bounds.top - camera.pos.y,
                entity.size.x, 
                entity.size.y );
            context.stroke();
        })
        resolvedTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y);
        context.stroke();
    }

}