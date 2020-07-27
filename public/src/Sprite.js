import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './loader.js'
export function loadMarioSprite() {
    return loadImage('/img/characters.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define("idleMario", 276, 44, 16, 16);
        return sprites;

});
}
export function loadBackgroundSprite() {
    return loadImage('/img/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile("ground", 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;

});
}