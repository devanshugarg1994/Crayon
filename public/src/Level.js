import Compositor from './Compositor.js';
import {Matrix} from './math.js';
import TileCollider from './TileCollider.js';
export default class Level {  
    constructor() {
        // Layering the componenet need to draw
        this.comp = new Compositor(); 
        // Unique Entity used in Game level
        this.entities = new Set();
        // Dividing whole game scene into tiles to detect collision
        this.tiles = new Matrix; 
        //
        this.tileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);
        });
    }

}