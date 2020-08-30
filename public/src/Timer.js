/*
*  Timer class is used update the game on every frame with help requestanimation frame
*  It is also relove the problem of frameRate 
*/

export default class Timer {
    /*
     * @param deltaTime --- It is the reciprocal of the time the frame per second in which we want to create game
     * By Default it is 60 frame per second
     */
    constructor (deltaTime = 1/60) {
        let lastTime = 0;    // lastTime the function is called
        let acumulatedTime = 0 // Time change from last call 

        // It is private function declare and define in constructor
        // It is make private to avoid overriding of the function
        this.proxyUpdate = (time) => {
            acumulatedTime += (time - lastTime) / 1500;
            
            while(acumulatedTime > deltaTime) {
                this.update(deltaTime);
                acumulatedTime-= deltaTime;
            }

            lastTime = time;
            this.enqueue();
        
        }
    }

    enqueue() {
        requestAnimationFrame(this.proxyUpdate);
    }

    start() {
        requestAnimationFrame(this.proxyUpdate);

    }
    /* 
    * this function is called on the instance of Timer and define at game level
    * We define the update for what we want to change in  the game every frame and call 'start' method which will take care frame rate and update the screen accordingly
    * and make sure game  behave same in different frame rate like 15fps, 30fps, 60fps, 144fps
    */
    update(deltaTime) {
        // Need to define at game Level
        console.warn('Unhandled update call in Timer');
    }


}