import { Sides, Entity, Trait } from '../Entity.js';
import { loadSpriteSheet } from '../loader.js'
import PendulumWalk from '../traits/PendulumWalk.js';
import Killable from '../traits/Killable.js';


class Bheaviour extends Trait {
    constructor(name) {
        super('bheaviour');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (them.stomper) {
            if (them.vel.y != us.vel.y) {
                us.killable.kill();
                them.stomper.bounce();
                us.pendulumWalk.speed = 0;
            } else {
                them.killable.kill();
            }

        }
    }
}



export function loadGoomba() {
    return loadSpriteSheet('goomba')
        .then(createGoombaFactory)
}
/*
* A factoryfunction that return the function which create Goomba Entity synchronously.
*/

function createGoombaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk')

    function routeAnim(goomba) {
        if (goomba.killable.dead) {
            return 'flat';
        }
        return walkAnim(goomba.lifeTime);
    }
    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    // callback that actually create the entity.
    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);
        goomba.addTrait(new PendulumWalk());
        goomba.addTrait(new Bheaviour());
        goomba.addTrait(new Killable());
        goomba.draw = drawGoomba;
        return goomba;
    }
}