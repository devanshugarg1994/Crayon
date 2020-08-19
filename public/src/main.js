import Timer from './Timer.js';
import {loadLevel} from './loader.js';
import {createMario} from './entities.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import setUpKeyBoard from './SetUpKeyboard.js'
import Camera from './Camera.js'
import setUpMouseControl from './Debug.js';



const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
// Parallel Loading of Sprites using Promise all
Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {

    const camera = new Camera();
    window.camera = camera;
    mario.pos.set(64, 64);

    // level.comp.layers.push(createCollisionLayer(level),
    //                     createCameraLayer(camera));

    level.entities.add(mario);

    const input = setUpKeyBoard(mario);
    input.listenTo(window);
    
    setUpMouseControl(canvas, mario, camera);


    const timer = new Timer(1/60);
        // Defining the update require in every frame
    // We only define it. It is called from Timer class
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context, camera);
    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
    timer.start();
});