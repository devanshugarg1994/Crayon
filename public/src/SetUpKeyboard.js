import KeyBoardState from './KeyBoardState.js'
export default function setUpKeyBoard(mario) {
    // Adding Key and there response
    const input = new KeyBoardState();
    input.addMapping("Space", keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.addMapping("ArrowRight", keyState => {
        // We are adding keyState here to negate the the multiple key pressed at the same time.
        mario.go.direction += keyState ? 1 : -1;
    });
    input.addMapping("KeyT", keyState => {
        // Turbo Speed fot the mario. HWen pressed mario pseed increase.
        mario.turbo(keyState);
    });
    input.addMapping("ArrowLeft", keyState => {
        // We are adding keyState here to negate the the multiple key pressed at the same time.
        mario.go.direction += keyState ? -1 : 1;

    });

    return input;
}