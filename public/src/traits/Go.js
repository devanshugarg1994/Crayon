import { Trait } from '../Entity.js'
export default class Go extends Trait {
    constructor() {
        super('go');
        // distance covered between pressing the ArrowKey and releasing it
        this.direction = 0;
        this.acceleration = 400;
        this.distance = 0;

        /* Direction become zero when we release button 
        * In case if we want to remember the direction. It is Zero intially.
        * It's value is either 1 or -1 depend upon mario facing the right side or left side respectively.
        */
        this.heading = 0;
        this.deacceleration = 300;
        this.dragFactor = 1 / 6000;

    }
    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        /* When a arrow key is pressed and is in pressed State direction have  value other than 0.
        * `this.direction` will have 1 if ArrowRight is pressed or -1 if ArrowLeft is pressed.
        */
        if (this.direction !== 0) {
            // We are increasing the velocity here without checking the maximum speed. To stop it from reaching infinite speed we to use `dragFactor`
            entity.vel.x += this.acceleration * this.direction * deltaTime;
            // If we are in Jump state we should not able to change direction in air (If Mario facing right when jump start it shouldn't we change in Air to face Left)
            /* 
            * We are checking if the entity as jump trait and then check if it is falling or not.
            * If not falling then heading is change to current direction
            */
            if (entity.jump) {
                if (entity.jump.falling === false) {
                    this.heading = this.direction;
                }
            } else {
                this.heading = this.direction;
            }
            /* If direction is 0 that means no Arrow key is pressed and if 
            * velocity is not zero we have to decrease the velocity (Deaccelration). 
            */
        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deacceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }
        /* 
        * Decreasing the speed by factor which depend on the dragFactor and currect speed.
        */
        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        // distance covered between pressing the ArrowKey and releasing it
        this.distance += absX * deltaTime;

    }


}