 
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
export function createBackgroundLayer(backgrounds, sprites) {
    const buffer =  document.createElement("canvas");
    buffer.width = 640;
    buffer.height = 640;
    drawBackground(backgrounds,buffer.getContext("2d"), sprites);

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

