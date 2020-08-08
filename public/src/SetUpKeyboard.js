import KeyBoardState from './KeyBoardState.js'
export default function setUpKeyBoard(entity) {
    // Adding Key and there response
    const input = new KeyBoardState ();
    input.addMapping("Space", keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });
    input.addMapping("ArrowRight", keyState => {
        entity.go.direction = keyState;
    });
    input.addMapping("ArrowLeft", keyState => {
        entity.go.direction = -keyState;
    });

    return input;
}