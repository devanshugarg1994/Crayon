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

/* 
* Matrix class
* Here x-axis represent column (not row). 
* Here y-axis represent row (not column). 
* We use smart mapping.
*/

export class Matrix {
    constructor() {
        this.grid = [];
    }

    iterate(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }
    set(x, y, value) {
        // First check the column present or not
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        // adding the y-axis
        this.grid[x][y] = value;
    }

    get(x, y) {
        const col = this.grid[x];
            if(col) {
                return col[y];
            }
            return undefined;
    }
}