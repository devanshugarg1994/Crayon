import TileResolver from "../TileResolver.js";




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