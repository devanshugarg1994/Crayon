import {Vec2} from './math.js'

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom')
}
export class Trait {
    constructor(name) {
        this.NAME = name
    }
    // Needed to define in subclass if we want handle obstruct for that trait.
    obstruct () {
        console.warn('Unhandled update call in Trait');
    }
    update () {
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
        // Skill that a entity could have
        this.tarits = [];

    }
    addTrait(trait) {
        this.tarits.push(trait);
        this[trait.NAME] = trait; 
    }
    obstruct (side) {
        this.tarits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }
    update(deltaTime) {
        this.tarits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }

     
}