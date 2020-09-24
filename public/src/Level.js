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
        // It contain list of entity which we need to check for intreaction.
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

            /* 
            * Here velocity is set to gravity after collision is check.
            */
            entity.vel.y += this.gravity * deltaTime;

        });

        /* 
        * We check entity interaction.
        */
        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        /* 
        * Excute the task are are enqueue to be excuted last in updation cycle for each entity
        */
        this.entities.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += deltaTime;
    }

}