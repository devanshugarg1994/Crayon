import { Trait } from '../Entity.js'
export default class Go extends Trait {
    constructor() {
        super('go');
        this.direction = 0;
        this.speed = 5000;
        this.distance = 0;
        // Direction become zreo when we release button 
        // In case if we want to remember the direction
        this.heading = 0;

    }
    update(entity, deltaTime) {

        entity.vel.x = this.speed * this.direction * deltaTime;
        if (this.direction) {
            this.heading = this.direction;
            // distance incrementing as level proceed
            // For bigger Level it is a prolem 
            // @ To-Do: Need to find optimize 
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }


}