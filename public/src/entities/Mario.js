import { Entity } from '../Entity.js';
import Jump from '../traits/Jump.js';
import Go from "../traits/Go.js";
import { loadSpriteSheet } from "../loader.js";
import createAnim from '../Anim.js'
import Stomper from '../traits/Stomper.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
const SLOW_DRAG = 1 / 6000;
const FAST_DRAG = 1 / 10000;

export function loadMario() {
    return loadSpriteSheet('mario')
        .then(createMarioFactory);


}

function createMarioFactory(sprite) {
    const runAnim = sprite.animations.get('run');
    function routeframe(mario) {
        // Returning frame if mario is Air as `ready 
        if (mario.jump.falling) {
            return 'jump';
        }
        if (mario.go.distance > 0) {
            // Returning Sliding frame of mario when direction of movement is change 
            if ((mario.vel.x > 0 && mario.go.direction < 0) || (mario.vel.x < 0 && mario.go.direction > 0)) {
                return 'break';
            }
            return runAnim(mario.go.distance);
        }
        return 'idle';
    }

    /* 
    * If Trubo Mode is on we just reudce the Drag Factor
    */
    function setTurbo(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    //changing frame on basis of mario movement
    function drawMario(context) {
        sprite.draw(routeframe(this), context, 0, 0, (this.go.heading < 0));
    }


    return function createMario() {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Stomper());
        mario.addTrait(new Killable());
        mario.killable.removeTime = 0;
        mario.turbo = setTurbo;
        mario.draw = drawMario ;
        mario.turbo(false);
        return mario;

    }
}