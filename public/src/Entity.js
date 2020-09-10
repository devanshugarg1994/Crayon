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
        /* 
        * It is the size of entity which we want to consider i.e.. area we will consider for collision
        * In case size of entity and collison area have some difference example `koopa` we set the size value to the collision value.
        * And to calculate the the poistion correctly we define the `offset`. 
        */
        this.size = new Vec2(0, 0);
        /* 
        * offset is extra area which is added to calculate the corner points around the entity.
        * if offset is zero the size and poistion of entity is used for collision detection
        */
        this.offset = new Vec2(0, 0);
        // Skill that a entity could have
        this.tarits = [];
        //lifeTime of the entity. It is structly increasing with time
        this.lifeTime = 0;
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
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