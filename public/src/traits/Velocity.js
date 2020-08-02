import {Trait} from '../Entity.js'
export default class Velocity extends Trait {
    constructor() {
        super('Velocity');
    }

    update(entity, deltaTime) {
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }


}