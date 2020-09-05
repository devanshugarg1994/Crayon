import { Sides, Trait } from '../Entity.js'

export default class PendulumWalk extends Trait {
    constructor() {
        super('pendulumWalk');
        this.speed = -30;
    }


    /* 
    * When collision is detected every obstruct is called
    * We perform changes on Trait as per requirement
    */

    obstruct(entity, side) {
        if (side == Sides.LEFT || side == Sides.RIGHT) {
            this.speed = - this.speed;
        }
    }

    /* 
    * Call at every frame and update the trait or entity properties
    * Here we are updating velocity of entity at every frame 
    */
    update(entity, deltaTime) {
        entity.vel.x = this.speed;

    }


}