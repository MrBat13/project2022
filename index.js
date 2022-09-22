import {dijkstra, randomMatrix} from "./Algorithms/Dijkstra.js";
import {init} from "./Algorithms/visualization.js";

const elCanvasTrigger = document.getElementById('showCanvas')
const elAlgorithmTrigger = document.getElementById('showAlgorithm')
const elInputStart = document.getElementById('inputStart')
const elInputEnd= document.getElementById('inputEnd')

export function numberToLetter (number) {
    let letters = ''
    while (number >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[number % 26] + letters
        number = Math.floor(number / 26) - 1
    }
    return letters
}

/*

function createArray() {
    const count = parseInt(elInput.value);
    const model = [];
    for (let x = 0; x < count; x++) {
        model[x] = [];
        for (let y = 0; y < count; y++) {
            let cell = document.getElementById(x + '_' + y);
            model[x][y] = cell.value;
        }
    }
    const array = [];
    for (let x = 0; x < count; x++) {
        array[x] = [];
        for (let y = 0; y < count; y++) {
            if (model[x][y] !== 0) {
                array[x][y] = {from: `${numberToLetter(x)}`, to: `${numberToLetter(y)}`, weight: model[x][y]};
            }
            if (model[x][y] === '0' || model[x][y] === '') {
                array[x][y] = '';
            }

        }
    }
    return array;
}
*/

function dijkstraTrigger(){
    dijkstra(elInputStart.value, elInputEnd.value);
}

function canvasTrigger(){
    //let array = randomMatrix();
    init();
}

elCanvasTrigger.addEventListener('click', canvasTrigger)
elAlgorithmTrigger.addEventListener('click', dijkstraTrigger)
