import { Sides, Entity } from '../Entity.js';
import { loadSpriteSheet } from '../loader.js'
import PendulumWalk from '../traits/PendulumWalk.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba')
        .then(createGoombaFactory)
}
/*
* A factoryfunction that return the function which create Goomba Entity synchronously.
*/
function createGoombaFactory(sprite) {

    const runAnim = sprite.animations.get('walk')
    function drawGoomba(context) {
        sprite.draw(runAnim(this.lifeTime), context, 0, 0);
    }

    // callback that actually create the entity.
    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);
        goomba.addTrait(new PendulumWalk());
        goomba.draw = drawGoomba;
        return goomba;
    }
}