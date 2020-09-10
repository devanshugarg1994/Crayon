import TileResolver from "./TileResolver.js";
import { Sides } from './Entity.js';
export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    checkY(entity) {

        /* 
        * Checking only bottom or upper part of entity for collision
        * (optimize :- before we are checking every tile occupied by entity
        * but for collision we only need to check boundry of entity)
        */
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }
        // Getting the corresponding tile indexe or (indexes) which need to check 

        const matches = this.tiles.searchByRange(entity.bounds.left, 
            entity.bounds.right, y, y);
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }
            // Since Velocity is positive it means the mario is moving downward
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.bounds.bottom = match.y1;
                    entity.vel.y = 0;
                    entity.obstruct(Sides.BOTTOM);

                }
            } else if (entity.vel.y < 0) {  // Since the Velocity negative mario is moving in Upward direction 
                if (entity.bounds.top < match.y2) {
                    entity.bounds.top = match.y2;
                    entity.vel.y = 0;
                    entity.obstruct(Sides.TOP);

                }
            }
        });
    }
    checkX(entity) {
        /* 
        * Checking only right  or left part of entity for collision
        * (optimize :- before we are checking every tile occupied by entity
        * but for collision we only need to check boundry of entity)
        */
        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        // Getting the corresponding tile indexe or (indexes) which need to check 

        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }
            // Since Velocity is positive it means the mario is moving downward
            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.bounds.right = match.x1;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.RIGHT);


                }
            } else if (entity.vel.x < 0) {  // Since the Velocity negative mario is moving in Upward direction 
                if (entity.bounds.left < match.x2) {
                    entity.bounds.left = match.x2;
                    entity.vel.x = 0;
                    entity.obstruct(Sides.LEFT);


                }
            }
        });
    }

}