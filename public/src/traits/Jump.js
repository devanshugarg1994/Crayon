import {Trait} from '../Entity.js'
export default class Jump extends Trait {
    constructor() {
        super('jump');
        // duration in the Air (movement in upward direction)
        this.duration = 0.5;
        //  Velocity of the jump
        this.velocity = 200;
        this.engagedTime = 0;
    }

    start() {
        this.engagedTime = this.duration;
    }

    cancel() {
        this.engagedTime = 0;
    }

    update(entity, deltaTime) {
        
       if (this.engagedTime > 0) {
           console.log("called");
        entity.vel.y = -this.velocity;
        this.engagedTime -= deltaTime;
       }
    }


}