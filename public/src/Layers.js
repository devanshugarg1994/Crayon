 
 /* 
 * A private function which is used by `createBackgroundLayer' function
 * to iterate over ranges mentiones in JSON and draw the tiles
 */
 function drawBackground(backgrounds, context, sprites) {
    for (const comp of  backgrounds) {
        const range = comp.ranges[0];
        for (let i= range[0]; i < range[1]; i++) {
            for (let j = range[2] ; j < range[3]; j++) {
                sprites.drawTiles(comp.tiles, context, i, j);
            }
        }

    }
}


/* 
* Here we are creating a HOF for backgound layer using pre-rendering.
* @param backgorunds -- a JSON is passes which contain range of tiles (Background)
*        sprite ---- erefrence to loadded image which refger to draw (Basic tile)
*/
export function createBackgroundLayer(backgrounds, sprites) {
    const buffer =  document.createElement("canvas");
    buffer.width = 640;
    buffer.height = 640;
    drawBackground(backgrounds,buffer.getContext("2d"), sprites);

    /*  Returning Draw function that will actually draw it on the screen
    *   @param context --- draw the image w.r.t to passed context
    */
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

/* 
* Draw simple entity on screen 
* @param entity --- passed the instance of etity thhat we need draw
*/
export function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    }
} 