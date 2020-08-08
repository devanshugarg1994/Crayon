import {createMario} from './entities.js'
import Timer from './Timer.js'
import {loadLevel} from './loader.js'
import {createCollisionLayer} from './Layers.js'
import setUpKeyBoard from './SetUpKeyboard.js'




const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
// Parallel Loading of Sprites using Promise all
Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(([mario,  level]) => {
    mario.pos.set(64, 180);
    // level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(mario);
    const input = setUpKeyBoard(mario);
    input.listenTo(window);

    // ['mousedown' , 'mouseup'].forEach(eventName => {
    //     canvas.addEventListener(eventName, evt => {
    //         if(evt.buttons === 1){
    //             mario.vel.set(0, 0);
    //             mario.pos.set(evt.offsetX, evt.offsetY);
    //         }
    //     });
    // });
    const timer = new Timer();
    // Defining the update require in every frame
    // We only define it. It is called from Timer class
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);


    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
   timer.start();

});
