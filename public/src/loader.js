/* A utility functiuon to load image */
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
}

/* 
* A utility function to add JSON
*/
export function loadJSON(name) {
    return fetch(`/levelJSON/${name}.json`)
    .then(response => response.json());
}