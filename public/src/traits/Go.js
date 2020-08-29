import { Trait } from '../Entity.js'
export default class Go extends Trait {
    constructor() {
        super('go');
        // distance covered between pressing the ArrowKey and releasing it
        this.direction = 0;
        this.acceleration = 400;
        this.distance = 0;
        // Direction become zero when we release button 
        // In case if we want to remember the direction. It is zoreo intially.
        // It's valu is either 1 or -1 depend upon mario facing the right side or left side respectively.
        this.heading = 0;
        this.deceleration = 300;
        this.dragFactor = 1 / 6000;

    }
    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        if (this.direction !== 0) {
            entity.vel.x += this.acceleration * this.direction * deltaTime;

            if (entity.jump) {
                if (entity.jump.falling === false) {
                    this.heading = this.direction;
                }
            } else {
                this.heading = this.direction;

            }

        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        // distance covered between pressing the ArrowKey and releasing it
        this.distance += absX * deltaTime;

    }


}