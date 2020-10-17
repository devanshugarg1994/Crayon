import { loadImage } from '../loader.js';
import SpriteSheet from '../SpriteSheet.js';

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

const xAdvance = new Map();
xAdvance.set("I", 1);
xAdvance.set("O", 0.5);

class Font {
    constructor(sprites, size) {
        this.sprites = sprites;
        this.size = size;
    }

    printFont(text, context, x, y) {
        let lastChar = null;

        [...text].forEach((char, pos) => {
            if (xAdvance.get(char)) {
                this.sprites.draw(char, context, (x + pos * (this.size - xAdvance.get(char))), y);

            } else {
                this.sprites.draw(char, context, x + pos * this.size, y);
            }
            lastChar = char;

        });
    }
}
export function loadFont() {
    return loadImage('./img/font.png')
        .then(image => {
            const fontSprite = new SpriteSheet(image);

            const size = 8;
            const rowLen = image.width;
            for (let [index, char] of [...CHARS].entries()) {
                const x = index * size % rowLen;
                const y = Math.floor(index * size / rowLen) * size;
                fontSprite.define(char, x, y, size, size);
            }

            return new Font(fontSprite, size);

        });
}
