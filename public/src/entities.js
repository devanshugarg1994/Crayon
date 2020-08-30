import {Entity} from './Entity.js';
import Jump from './traits/Jump.js';
import Go from "./traits/Go.js";
import {loadSpriteSheet} from "./loader.js";
import createAnim from './Anim.js'
const SLOW_DRAG = 1/6000;
const FAST_DRAG = 1/10000;

export function createMario() {
    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity(); 
            mario.size.set(14, 16);
            mario.addTrait(new Go());
            mario.addTrait(new Jump());
            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 8);
            /* 
            * If Trubo Mode is on we just reudce the Drag Factor
            */
            mario.turbo = function setTurro(turboOn) {
                this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
            }
            //changing frame on basis of mario movement
            function routeframe(mario) {
                // Returning frame if mario is Air as `ready 
                if (mario.jump.falling) {
                    return 'jump';
                }
                if (mario.go.distance > 0) {
                    // Returning Sliding frame of mario when direction of movement is change 
                    if ((mario.vel.x > 0 && mario.go.direction < 0 ) || (mario.vel.x < 0 && mario.go.direction > 0)){
                        return 'break';
                    }
                    return runAnim(mario.go.distance);
                }
                return 'idle';
            }
            mario.draw = function drawMario(context) {
                sprite.draw(routeframe(this), context, 0, 0, (mario.go.heading < 0));
            }
            return mario;
        });


}