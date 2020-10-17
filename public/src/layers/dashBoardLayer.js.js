/* 
* Draw simple entity on screen 
* @param entity --- passed the instance of entity that we need draw
*/
export function createDashBoardLayer(font, playerEnv) {

    const LINE1 = font.size;
    const LINE2 = font.size * 2;
    let coins = 50;

    const score = 7879;
    return function dashBoardLayer(context, camera) {
         const time =  playerEnv.playerController.time;
         font.printFont('MARIO', context, 16, 8);
         font.printFont(score.toString().  padStart(6, '0'), context, 16, LINE2);

         font.printFont('@x' + coins.toString().padStart(2, '0'), context, 96, LINE2);
         font.printFont('WORLD', context, 152, 8);
         font.printFont('1-1', context, 158, LINE2);

         font.printFont('TIME', context, 208, 8);
         font.printFont(time.toFixed().toString().padStart(3, '0'), context, 216, LINE2);

    }
}
