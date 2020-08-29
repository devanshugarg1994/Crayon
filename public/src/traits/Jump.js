import { Sides, Trait } from '../Entity.js'

export default class Jump extends Trait {
    constructor() {
        super('jump');
        // duration in the Air (movement in upward direction)
        this.duration = 0.3;
        // Velocity of the jump
        this.velocity = 200;
        this.engagedTime = 0;
        // We are able to jump only when `ready` is false. In other case jump will not work
        this.ready = 0;
        // When we press jump button and mario is in Air and coming down we have some grace Time
        // Grace Time : Is the time when mario is in Air but we want to allow jump again (As player could press it little before it hit ground)
        this.speedBoost = 0.3;
        this.gracePeriod = 0.1;
        this.requestTime = 0;
    }
    start() {
        this.requestTime = this.gracePeriod;

    }
    cancel() {
        this.engagedTime = 0;
        this.requestTime = 0;

    }
    get falling() {
        return (this.ready < 0);
    }
    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            // setting `ready` to 1 when we can jump and touching ground
            this.ready = 1;
        } else if (side === Sides.TOP) {
            this.cancel();
        }
    }
    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engagedTime = this.duration;
                this.requestTime = 0;
            }
            this.requestTime -= deltaTime;
        }
        if (this.engagedTime > 0) {
            entity.vel.y = -(this.velocity + (Math.abs(this.velocity) * this.speedBoost));
            console.log(entity.vel.y);
            this.engagedTime -= deltaTime;
        }
        this.ready--;
    }


}