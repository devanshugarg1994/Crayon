import KeyBoardState from './KeyBoardState.js'
export default function setUpKeyBoard(entity) {
    // Adding Key and there response
    const input = new KeyBoardState();
    input.addMapping("Space", keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });
    input.addMapping("ArrowRight", keyState => {
        // We are adding keyState here to negate the the multiple key pressed at the same time.
        entity.go.direction += keyState ? 1 : -1;
        console.log( entity.go.direction, "right");
    });
    input.addMapping("ArrowLeft", keyState => {
        // We are adding keyState here to negate the the multiple key pressed at the same time.
        entity.go.direction += keyState ? -1 : 1;
        console.log( entity.go.direction, "ArrowLeft");

    });

    return input;
}