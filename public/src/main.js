import Timer from './Timer.js';
import {createLevelLoader } from './loaders/level.js';

import setUpKeyBoard from './SetUpKeyboard.js'
import Camera from './Camera.js'
import setUpMouseControl from './Debug.js';
import loadEntities from './entities.js';
import { Entity } from './Entity.js';
import PlayerController from './traits/PlayerController.js.js';
import { createCollisionLayer } from './layers/collisionLayer.js';
import { createCameraLayer } from './layers/cameraLayer.js';


function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    playerControl.checkpoint.set(64, 64)

    return playerEnv;
}
// Parallel Loading of Sprites using Promise all
async function main (canvas) {
    const context = canvas.getContext('2d');

    const entitiesFactory = await loadEntities();
    const loadlevel = await createLevelLoader(entitiesFactory);
    const level = await loadlevel('1-1');

    const camera = new Camera();
    window.camera = camera;
    const mario = entitiesFactory.mario()


    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);


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
            camera.pos.x = Math.max(0, mario.pos.x - 100);

        }
    }
    // Start Rendering It will also call update function which is call on every frame to update the screen
    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas); 