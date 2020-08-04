import Compositor from './Compositor.js'
import {Matrix} from './math.js'
export default class Level {
    constructor() {
        // Layering the componenet need to draw
        this.comp = new Compositor(); 
        // Unique Entity used in Game level
        this.entities = new Set();
        // Dividing whole game scene into tiles to detect collision
        this.tiles = new Matrix; 
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }

}