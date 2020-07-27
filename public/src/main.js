import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadJSON} from './loader.js';

function drawBackground(backgrounds, context, sprites) {
        for (const comp of  backgrounds) {
            const range = comp.ranges[0];
            for (let i= range[0]; i < range[1]; i++) {
                for (let j = range[2] ; j < range[3]; j++) {
                    sprites.drawTiles(comp.tiles, context, i, j);

                }
            }

            }
    }

    // json.array.forEach(element => {
        
    // });
// }


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define("ground", 0, 0);
    sprites.define('sky', 3, 23);
    loadJSON('1-1')
    .then(json => {
        drawBackground(json.backgrounds, context, sprites);
        } )


    for(let i=0; i<25; i++) {
        for(let j=12; j<14; j++) {
            sprites.drawTiles('ground', context, i, j);

        }
    }

});