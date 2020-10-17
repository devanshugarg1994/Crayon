import { Sides, Trait, Entity } from '../Entity.js'

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.queueBounce = false;
        this.bounceSpeed = 400;

    }

    onStomped(us, them){

    }
    
    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }
    collides(us, them) {
        if (them.killable && !them.killable.dead && us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.onStomped(us, them);
        }
    }


}