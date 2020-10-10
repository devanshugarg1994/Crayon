/* 
* Create a HOC function 
*/
export function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;
    // Overrided the functon to store position when it call a every frame from Level class from update method
    // We are storing position of entities  at every frame and then calling original function.
    tileResolver.getByIndex = function getByIndexfake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }
    // function return is called by Level class as we add the layer
    // in `comp` instance of Compositor Class in Level Class
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