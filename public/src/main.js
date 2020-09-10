import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';

import {createCollisionLayer, createCameraLayer} from './layers.js';
import setUpKeyBoard from './SetUpKeyboard.js'
import Camera from './Camera.js'
import setUpMouseControl from './Debug.js';
import loadEntities from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
// Parallel Loading of Sprites using Promise all
Promise.all([
    loadEntities(),
    loadLevel('1-1'),
])
.then(([entitiesFactory, level]) => {
    const camera = new Camera();
    window.camera = camera;
    const mario = entitiesFactory.mario()
    mario.pos.set(64, 64);
    level.entities.add(mario);

    const goomba = entitiesFactory.goomba();
    goomba.pos.x = 250;
    level.entities.add(goomba);  
    
    const koopa = entitiesFactory.koopa();
    koopa.pos.x = 260;
    level.entities.add(koopa);


    level.comp.layers.push(createCollisionLayer(level),
                        createCameraLayer(camera));

    const input = setUpKeyBoard(mario);
    input.listenTo(window);
    // setUpMouseControl(canvas, mario, camera);
    const timer = new Timer(1/60);
    // Defining the update require in every frame
    // We only define it. It is called from Timer class
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context, camera);
        if(mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;

        }
    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
    timer.start();
});