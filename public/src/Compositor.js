/* 
* Compsitor class is used to hold all layers and we render all layer w.r.t there context 
*/
export default class Compositor {
    constructor() {
        /* 
        * For addding layers 
        */
        this.layers = [];
    }
    /* 
    *  Draw layers w.r.t. to there context.
    *  Layeres are drawn in order in which they are pushed
    *  i.e.. the layer added first is draw first and the layer added last draw at last
    */
    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}