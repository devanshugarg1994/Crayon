const PRESSED = 1;
const RELEASED = 0;
export default class KeyBoardState {
    constructor() {
        
        // Hold the current state of a given key 
        this.keyStates = new Map();
        // Hold the code and coresponding callback function
        this.keyMap = new Map();
    }
    // Mapping the keys with there callbavk and store them
    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }
    // function called when any key is PRESSED or RELEASED
    // @param event ----- event data that just occured
    handleEvent(event) {
        const { code } = event;
        // If key is not registered with any callback then just return as We didn't need to do anything
        if (!this.keyMap.has(code)) {
            return;
        }
        // If key is registered with any callback then first stopping the Default bheaviour (Bubling nad capturing)
        event.preventDefault();
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        /* 
        * `handleEvent` function is called many times even if we press a key and do not release it.
        * it may lead to multiple times of calling of the function 'handleEvent'
        * to stop callback from running we check the state of the key.
        * If it is same as previous we do not do anything and if not we call the callback 
        */
        if (this.keyStates.get(code) === keyState) {
            return;
        }
        // Now if not return means state is changed. We have to update the state in Map and call callbackfunction
        this.keyStates.set(code, keyState);
        this.keyMap.get(code)(keyState);
    }
    // Creating a wrapper to change the global object 
    // In case node it is "global" and in case of broser it is "window"
    // You can change it at game level if want to run in node enviornmnet or browser.
    listenTo(window) {
        ['keydown', 'keyup'].forEach((eventName) => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            })
        });

    }
}