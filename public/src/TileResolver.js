
/* 
*  TileResolver class is used to convert the world position into a Matrix mapped and vice versa.
*/
export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }
    // Convert position into tile number by Index(matrix)
    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }
    /* 
    * toIndexRange take 2 position parameter pos1, pos2, where pos2 > pos2
    * It take 2 position and return an array which contain rage of indexes 
    * between these position.
    */
    toIndexRange(pos1, pos2) {
        const pMAx = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        let pos = pos1;
        const range = [];
        do {
            range.push(this.toIndex(pos))
            pos += this.tileSize;
        } while(pos < pMAx);
        return range;
    }
    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2
            }
        }
    }

    searchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        );
    }

    searchByRange(x1, x2, y1, y2) {
        const matches =[];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if(match) {
                    matches.push(match);
                }
            });
        })
        return matches;
    }

}