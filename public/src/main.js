import Compositor from './Compositor.js'
import {loadJSON} from './loader.js';
import {loadMarioSprite, loadBackgroundSprite} from './Sprite.js'
import {createBackgroundLayer} from './Layers.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw("idleMario", context, pos.x, pos.y);
    }
}

// Parallel Loading of Sprites using Promise all
Promise.all([
    loadMarioSprite(),
    loadBackgroundSprite(),
    loadJSON('1-1')

])
.then(([marioSprite, backgroundSprite, response]) => {

    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(response.backgrounds, backgroundSprite);
    comp.layers.push(backgroundLayer);
    const pos = {
        x: 64,
        y: 65
    };
    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);
function update() {
    comp.draw(context);
    marioSprite.draw("idleMario", context, pos.x, pos.y);
    pos.x += 4;
    pos.y += 4;
    requestAnimationFrame(update);

}
update();
});
