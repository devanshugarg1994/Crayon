/* 
* Checking for collision between 2 entity
*/
export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    /*
    * checking on every update call from level for collision
    */
    check(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }
            // checking collision effect when entity intreact i.e.. overlap
            if(subject.bounds.overlaps(candidate.bounds)) {
                subject.collides(candidate);
                candidate.collides(subject);
            }

        });
    }
}