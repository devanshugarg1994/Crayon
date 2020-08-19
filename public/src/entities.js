import {Entity} from './Entity.js';
import Jump from './traits/Jump.js';
import Go from "./traits/Go.js";
import {loadSpriteSheet} from "./loader.js";
import createAnim from './Anim.js'

export function createMario() {
    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity(); 
            mario.size.set(14, 16);
            mario.addTrait(new Go());
            mario.addTrait(new Jump());
            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

            //changing frame on basis of mario movement
            function routeframe(mario) {
                if (mario.go.direction !== 0) {
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