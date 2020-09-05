import { Sides, Entity } from '../Entity.js';
import { loadSpriteSheet } from '../loader.js'
import PendulumWalk from "../traits/PendulumWalk.js";
export function loadKoopa() {
    return loadSpriteSheet('koopa')
        .then(createKoopaFactory)
}


/*
* A factoryfunction that return the function which create Koopa Entity synchronously.
*/
function createKoopaFactory(sprite) {

    const runAnim = sprite.animations.get('walk')
    function drawKoopa(context) {
        sprite.draw(runAnim(this.lifeTime), context, 0, 0, this.vel.x < 0);
    }

    // callback that actually create the entity.
    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 24);
        koopa.addTrait(new PendulumWalk());
        koopa.draw = drawKoopa;
        return koopa;
    }
}