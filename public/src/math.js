/* 
* Vec2 represent 2 vector class 
*/
export class Vec2 {
    constructor(x = 0, y= 0) {
        this.x = x;
        this.y = y;
    }
    set (x, y) {
        this.x = x;
        this.y = y;
    }
    getX () {
        return this.x;
    }
    getY() {
        return this.y;
    }
    get() {
        return { x , y };
    }
}