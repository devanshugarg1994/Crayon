import Compositor from './Compositor.js';
import {Matrix} from './math.js';
import TileCollider from './TileCollider.js';
export default class Level {  
    constructor() {
        this.gravity = 1500;
        // total time in the level 
        this.totalTime = 0;
        // Layering the componenet need to draw
        this.comp = new Compositor(); 
        // Unique Entity used in Game level
        this.entities = new Set();
        // Dividing whole game scene into tiles to detect collision
        this.tiles = new Matrix(); 
        //
        this.tileCollider = new TileCollider(this.tiles);
    }


    /* 
    * update function is call for every frame and it update the position. Then we check for the collision  
    * This is the function in which we are changing the poistion of entity with the help velocity.
    */
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            /* 
            * Here velocity is set to gravity after collision is check.
            */
            entity.vel.y += this.gravity * deltaTime;

        });

        this.totalTime += deltaTime;
    }

}