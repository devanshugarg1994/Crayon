import { Vec2 } from './math.js'
import BoundingBox from './BoundingBox.js';

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    RIGHT: Symbol('left'),
    LEFT: Symbol('right')
}
export class Trait {
    constructor(name) {
        this.NAME = name
    }
    // Needed to define in subclass if we want handle obstruct for that trait.
    obstruct() {
        console.warn('Unhandled update call in Trait');
    }
    update() {
        console.warn('Unhandled update call in Trait');
    }
}
/* 
* Entity is anything on the screen which contain one or more component 
*/
export class Entity {
    constructor(x, y) {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        /* 
        * offset is used to add to reduce the area used by entity for collision detection.
        * if offset is zero the size and poistion of entity is used for collision detection
        */
        this.offset = new Vec2(0, 0);
        // Skill that a entity could have
        this.tarits = [];
        //lifeTime of the entity. It is increasing time
        this.lifeTime = 0;
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        console.log(this.bounds)


    }
    addTrait(trait) {
        this.tarits.push(trait);
        this[trait.NAME] = trait;
    }
    obstruct(side) {
        this.tarits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }
    update(deltaTime) {
        this.tarits.forEach(trait => {
            trait.update(this, deltaTime);
        });
        // Increasing lifetime on every Update call. It is a infinite increasing value for the entity object
        this.lifeTime += deltaTime;
    }


}