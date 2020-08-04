import {createMario} from './entities.js'
import Timer from './Timer.js'
import KeyboardState from './KeyBoardState.js'
import {loadLevel} from './loader.js'
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


// Parallel Loading of Sprites using Promise all
Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(([mario,  level]) => {
    const gravity = 2000;
    mario.pos.set(64, 180);
    level.entities.add(mario);
    // Adding Key and there response
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
        level.update(deltaTime);
        level.comp.draw(context);
 
        mario.vel.y +=gravity * deltaTime;

    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
   timer.start();

});
