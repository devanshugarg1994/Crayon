import TileResolver from "./TileResolver.js";

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
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }
        // Getting the corresponding tile indexe or (indexes) which need to check 

        const matches = this.tiles.searchByRange(entity.pos.x, entity.pos.x + entity.size.x, y, y);
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }
            // Since Velocity is positive it means the mario is moving downward
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) {  // Since the Velocity negative mario is moving in Upward direction 
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
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
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }

        // Getting the corresponding tile indexe or (indexes) which need to check 
        const matches = this.tiles.searchByRange(x, x, entity.pos.y, entity.pos.y + entity.size.y);
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }
            // Since Velocity is positive it means the mario is moving downward
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;

                }
            } else if (entity.vel.x < 0) {  // Since the Velocity negative mario is moving in Upward direction 
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;

                }
            }
        });
    }

}