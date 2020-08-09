/* 
* Here we are creating a HOF for backgound layer using pre-rendering.
* @param level -- a instance of the level which coantin basic information about level
* ex:- layering, entities in the level and 
* 
* sprite ---- refernce to loaded image which refer to draw (Basic tile)
*/
export function createBackgroundLayer(level, sprites) {
    const buffer =  document.createElement("canvas");
    buffer.width = 640;
    buffer.height = 640;
    const context = buffer.getContext("2d");
    level.tiles.iterate((tile, x, y) => {
            sprites.drawTiles(tile.name, context, x, y)
    });
 
    
    /*  Returning Draw function that will actually draw it on the screen
    *   @param context --- draw the image w.r.t to passed context
    */
    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
    }
}

/* 
* Draw simple entity on screen 
* @param entity --- passed the instance of etity thhat we need draw
*/
export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');
    console.log(spriteBufferContext);
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
* Ceare a HOC function 
*/
export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    // Overrided the functon to store poistion when it call a every frame from Level class from uptae method
    // We are storing poistion of entity (mario) at every frame and then calling original function.
    tileResolver.getByIndex = function getByIndexfake (x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver,x, y);
    }
    // function return is called by Level class as we add the layer
    // in comp instance of Compositor Class in Level Class
    return function drawCollision(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect((x * tileSize) - camera.pos.x,
             (y * tileSize) - camera.pos.y, 
             tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x - camera.pos.x,
                 entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        })
        resolvedTiles.length = 0;
    }
}