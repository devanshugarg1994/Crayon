
import SpriteSheet from './SpriteSheet.js'
import createAnim from './Anim.js'


/* 
* A utility functiuon to load image
*/
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
            // To-Do
            // In case of variable tile size we have to update
            const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(tileSpec => {
                    sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
                });
            }
            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(frameSpec.name, ...frameSpec.rect);
                });
            }
            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animSpec => {
                    const animation = createAnim(animSpec.frames, animSpec.frameLen);
                    sprites.defineAnim(animSpec.name, animation);
                });
            }
            return sprites;
        })


}

