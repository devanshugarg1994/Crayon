import { Sides, Entity, Trait } from '../Entity.js';
import { loadSpriteSheet } from '../loader.js'
import Killable from '../traits/Killable.js';
import PendulumWalk from "../traits/PendulumWalk.js";
export function loadKoopa() {
    return loadSpriteSheet('koopa')
        .then(createKoopaFactory)
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Bheaviour extends Trait {
    constructor(name) {
        super('bheaviour');
        this.state = STATE_WALKING;
        this.hideTime = 0;
        this.hideDuration = 4;
        this.panicSpeed = 300;
    }
    // called when intreacted with an entity((mario).
    collides(us, them) {
        // return if entity is in scene but died.
        if (us.killable.dead) {
            return;
        }
        // update collison effect only if the entity inteacted has stomper property (mario) and for other we iognore
        if (them.stomper) {
            if (them.vel.y != us.vel.y) {
                this.handleStomp(us, them);
            } else {
                this.handleNudge(us, them);
            }

        }
    }

    // Collison in X direction depending on state of koopa
    handleNudge(us, them) {
        if (this.state === STATE_WALKING) {
            them.killable.kill();
        } else if (this.state === STATE_HIDING) {
            this.setPanic(us, them);

        } else if (this.state === STATE_PANIC) {
            them.killable.kill();
        }
    }
    // Collision in Y direction depending omn state of koopa
    handleStomp(us, them) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        } else if (this.state === STATE_HIDING) {
            us.killable.kill();
            us.canCollide = false;
            us.vel.set(100, -200);
        } else if (this.state === STATE_PANIC) {
            this.hide(us);
        }
    }
    // Panic State 
    setPanic(us, them) {
        us.pendulumWalk.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }
    // Hide state
    hide(us) {
        us.vel.x = 0;
        us.pendulumWalk.speed = 0;
        this.state = STATE_HIDING;
        this.hideTime = 0;
    }
    // Unhide the koopa
    unhide(us) {
        us.pendulumWalk.speed = 30;
        this.state = STATE_WALKING;
    }

    update(us, delatTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += delatTime;
            if (this.hideTime > this.hideDuration) {
                this.unhide(us);
            }
        }
    }
}

/*
* A factoryfunction that return the function which create Koopa Entity synchronously.
*/
function createKoopaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    const wakeAnim = sprite.animations.get('wake');
    function routeAnim(koopa) {
        if (koopa.bheaviour.state === STATE_HIDING || koopa.bheaviour.state === STATE_PANIC) {
            if (koopa.bheaviour.hideTime > 3) {
                return wakeAnim(koopa.bheaviour.hideTime);
            }
            return "hiding";
        }
        return walkAnim(koopa.lifeTime)
    }
    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    // callback that actually create the entity.
    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;
        koopa.addTrait(new PendulumWalk());
        koopa.addTrait(new Bheaviour());
        koopa.addTrait(new Killable());
        koopa.draw = drawKoopa;
        return koopa;
    }
}