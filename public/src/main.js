import Compositor from './Compositor.js'
import {loadJSON} from './loader.js';
import {loadMarioSprite, loadBackgroundSprite} from './Sprite.js'
import {createBackgroundLayer, createSpriteLayer} from './Layers.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
import KeyboardState from './KeyBoardState.js'

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
    const gravity = 2000;
    mario.pos.set(64, 180);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);
    // Adding KEy and there response
    const input = new KeyboardState();
    input.addMapping(32, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    })
    input.listenTo(window);
    const timer = new Timer();
    // Defining the update require in every frame
    // We only define it. It is called from Timer class
    timer.update = function update(deltaTime) {
        mario.update(deltaTime);
        comp.draw(context);

        mario.vel.y +=gravity * deltaTime;

    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
   timer.start();

});
