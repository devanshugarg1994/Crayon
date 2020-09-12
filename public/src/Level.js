import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';
import EntityCollider from './EntityCollider.js';
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
        // this.tiles = new Matrix(); 
        
        // Store the information of matrix for checking collision.
        this.tileCollider = null;

        this.entityCollider = new EntityCollider(this.entities);
    }

    /* 
    * We have seprated the draw and collision matrix 
    * For draw we use multilayer system but coliision detection we use single layre
    * Hence the matrix passed contain whole in single matrix
    * The matrix pass contain will update the matrix if another tile is updated on already pleaced tile
    */
    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    /* 
    * update function is call for every frame and it update the position. Then we check for the collision  
    * This is the function in which we are changing the poistion of entity with the help velocity.
    */
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
            
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime; 
            this.tileCollider.checkY(entity);


            /* 
            * Here velocity is set to gravity after collision is check.
            */
            entity.vel.y += this.gravity * deltaTime;

        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        })

        this.totalTime += deltaTime;
    }

}