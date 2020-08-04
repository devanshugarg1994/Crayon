/* 
* Here we are creating a HOF for backgound layer using pre-rendering.
* @param level -- a instance of the level which coantin basic information about level
* ex:- layering, entities in the level and 
* 
* sprite ---- refernce to loaded image which refger to draw (Basic tile)
*/
export function createBackgroundLayer(level, sprites) {
    const buffer =  document.createElement("canvas");
    buffer.width = 640;
    buffer.height = 640;
    const context = buffer.getContext("2d");
    console.log(level.tiles.grid);
    level.tiles.iterate((tile, x, y) => {
            sprites.drawTiles(tile.name, context, x, y)
    });

    
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
export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);

        });
    }
} 