import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './loader.js'
/* 
* It is a game specific file where we have create function to load different component 
*/

/* 
* Loading  chracter from spritesheet as per now
*/
export function loadMarioSprite() {
    return loadImage('/img/characters.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define("idleMario", 276, 44, 16, 16);
        return sprites;

});
}


