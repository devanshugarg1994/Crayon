export default class BoundingBox {
    /*
    *@param : pos - It is a refernce of the object for position mentioned in the Entity class.
              size - It is refernce object for size mentioned in the Entity class.
              offset - It is a reference object for the offset. 

    */

    constructor(pos, size, offset) {
        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    /* 
    * We are checking the rectangle collision of 2 entity and returning true if they are colliding.
    */

    overlaps(box) {
        return this.bottom > box.top &&
            this.top < box.bottom &&
            this.right > box.left &&
            this.left < box.left;
    }
    get bottom() {
        return this.pos.y + this.size.y + this.offset.y;
    }

    set bottom(y) {
        this.pos.y = y - (this.size.y + this.offset.y);
    }

    get top() {
        return this.pos.y + this.offset.y;
    }

    set top(y) {
        this.pos.y = y - this.offset.y;
    }

    get left() {
        return this.pos.x + this.offset.x;
    }

    set left(x) {
        this.pos.x = x - this.offset.x;
    }

    get right() {
        return this.pos.x + this.size.x + this.offset.x;
    }

    set right(x) {
        this.pos.x = x - (this.size.x + this.offset.x);
    }
}
