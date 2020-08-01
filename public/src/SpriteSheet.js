export default class SpriteSheet {
    /* @image refrence passed after loading
    *  @width width of a frame
    *  @ height of a frame 
    * *  We divide whole sprite into small frame where each frame is of passed width and height  
    */
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    /* 
    ** Here we define the image frame after the image is loaded and draw it to another canvas (preloading).
    * @name is the refrence name to the frame of the sprite we want draw.
    * @x It is the position of x cliping need to crop from sprite. it is just the position of the frame with refrence to other frame.
    * @y It is the position of y cliping need to crop from sprite. it is just the position of the frame with refrence to other frame.
    */
    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        buffer.getContext('2d').drawImage(this.image, x , y ,  width , height, 0, 0, width, height);
        this.tiles.set(name, buffer);
        const canvas = document.getElementById('screen');
    }
    
    defineTile(name , x, y) {
        this.define(name , x * this.width, y * this.height, this.width, this.height);
    }
    /*
    * @name is the refernce name of sprite
    * @conext is the context on which we want draw the canvas
    * @x x-position of the image on canvas using context
    * @y y-position of the image on canvas using context
    */

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y); 
    }

    /* 
    *This function is used when we want to draw a frame multiple times (continuously) like tile 
    */
   drawTiles(name, context, x , y) {
    this.draw(name , context,  x * this.width, y * this.height); 
   }
}