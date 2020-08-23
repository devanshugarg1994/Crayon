import { Trait } from '../Entity.js'
export default class Go extends Trait {
    constructor() {
        super('go');
        this.direction = 0;
        this.acceleration = 400;
        this.distance = 0;
        // Direction become zreo when we release button 
        // In case if we want to remember the direction
        this.heading = 0;
        this.deceleration = 300;
        this.dragFactor = 1 / 6000;

    }
    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        if (this.direction !== 0) {
            this.heading = this.direction;
            entity.vel.x += this.acceleration * this.direction * deltaTime;

        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;
        // distance incrementing as level proceed
        // For bigger Level it is a problem 
        // @ To-Do: Need to find optimize 
        this.distance += absX * deltaTime;

    }


}