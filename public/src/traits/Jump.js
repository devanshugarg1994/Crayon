import { Sides, Trait } from '../Entity.js'

export default class Jump extends Trait {
    constructor() {
        super('jump');
        // duration in the Air (movement in upward direction)
        this.duration = 0.3;
        // Velocity of the jump
        this.velocity = 200;
        this.engagedTime = 0;
        // We are able to jump only when `ready` is 1. In other case jump will not work
        this.ready = 0;
        // When we press jump button and mario is in Air and coming down we have some grace Time
        // Grace Time : Is the time when mario is in Air but we want to allow jump again (As player could press it little before it hit ground)
        this.gracePeriod = 0.1;

        /* 
        * When we are moving and jump then we  jump higher by the factor `speedBoost' of then the usual jump 
        */
        this.speedBoost = 0.3;
        this.requestTime = 0;
    }
    start() {
        this.requestTime = this.gracePeriod;
    }
    /* 
    * Called as soon as we release the button Hence the height of jump is depend the time for which we pressed and hold the `Spcae` key.
    * If if we press it for long time then the jump height is determine by the `this.duration`.
    */
    cancel() {
        this.engagedTime = 0;
        this.requestTime = 0;
    }
    get falling() {
        return (this.ready < 0);
    }
    /*
    *  When the mario touch ground `ready` will be set 1 which means we can jump
    *  obstruct is call on collision with ground or from ceiling.
    */
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
            this.engagedTime -= deltaTime;
        }
        this.ready--;
    }


}