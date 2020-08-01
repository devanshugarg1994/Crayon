import {Vec2} from './math.js'

/* 
* Entity is anything on the screen which contain one or more component 
*/
export class Entity {
    constructor(x, y) {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
    }

    
}