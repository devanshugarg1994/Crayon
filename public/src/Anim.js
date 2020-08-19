/* 
* Function to create Animation
* @param  frames:-- An array conatin the frames need to refer 
*         framelength:--- For now consider is unitless value
* function return anoher function which will take the distance  as parameter which used to calculate the actual frameRate
*/
export default function createAnim(frames, framelength) {
    return function resolveFrame(distance) {
        /*
        *  We are calculating frameRate.
        *  @param : distance -- We are handling two type animation one is `character' animation whose animation depend on movement
        *  and another is frame animation (like chance block). Distance is an strictly increasing variable. In case of character it the
        *  distance covered by the character and in other case is  time elapsed while playing game.  
        * 
        */
        const frameIndex = Math.floor(distance / framelength) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;

    }; 
}