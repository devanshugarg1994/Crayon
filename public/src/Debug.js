export default function setUpMouseControl (canvas, entity, camera) {
    let lastEvent;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            } else if (event.buttons === 2
                && lastEvent && lastEvent.buttons === 2
                && lastEvent.type === 'mousemove') {
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
                console.log(camera)
            }
            lastEvent = event;
        });
    });

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
}