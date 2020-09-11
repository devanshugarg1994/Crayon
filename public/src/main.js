import Timer from './Timer.js';
import {createLevelLoader } from './loaders/level.js';

import {createCollisionLayer, createCameraLayer} from './layers.js';
import setUpKeyBoard from './SetUpKeyboard.js'
import Camera from './Camera.js'
import setUpMouseControl from './Debug.js';
import loadEntities from './entities.js';

// Parallel Loading of Sprites using Promise all
async function main (canvas) {
    const context = canvas.getContext('2d');

    const entitiesFactory = await loadEntities();
    const loadlevel = await createLevelLoader(entitiesFactory);
    const level = await loadlevel('1-1');

    const camera = new Camera();
    window.camera = camera;
    const mario = entitiesFactory.mario()
    mario.pos.set(64, 64);
    level.entities.add(mario);

  


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
}

const canvas = document.getElementById('screen');
main(canvas); 