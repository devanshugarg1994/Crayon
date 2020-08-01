import Compositor from './Compositor.js'
import {loadJSON} from './loader.js';
import {loadMarioSprite, loadBackgroundSprite} from './Sprite.js'
import {createBackgroundLayer, createSpriteLayer} from './Layers.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


// Parallel Loading of Sprites using Promise all
Promise.all([
    createMario(),
    loadBackgroundSprite(),
    loadJSON('1-1')

])
.then(([mario, backgroundSprite, response]) => {

    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(response.backgrounds, backgroundSprite);
    comp.layers.push(backgroundLayer);
    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(300, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer();
    // Defining the update require in every frame
    timer.update = function update(deltaTime) {
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y +=gravity;

    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
   timer.start();

});
