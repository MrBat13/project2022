import {dijkstra} from "./Algorithms/Dijkstra.js";

const elInput = document.getElementById('inputBox')
const elCanvasTrigger = document.getElementById('showCanvas')
const elMatrixTrigger = document.getElementById('showMatrix')
const elCanvas = document.getElementById('canvas')
const elMatrix = document.getElementById('divMatrix')
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

function renderCanvas(array) {
    const ctx = elCanvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight - 200;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const radius = 15;
    const nodes = [];
    //Отрисовка узла
    for (let x = 0; x < array.length; x++) {
        let X = Math.random() * (ctx.canvas.width);
        let Y = Math.random() * (ctx.canvas.height);
        nodes[x] = {posX: `${X}`, posY: `${Y}`};
        ctx.beginPath();
        ctx.arc(X, Y, radius, 0, Math.PI * 2, false);
        ctx.fillText(`${x}`, X, Y);
        ctx.stroke();
    }
    //Отрисовка ребра
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array.length; y++) {
            if (array[x][y] !== '' && array[x][y].weight !== '0') {
                ctx.beginPath()
                ctx.moveTo(nodes[y].posX, nodes[y].posY)
                ctx.lineTo(nodes[x].posX, nodes[x].posY)
                ctx.stroke();
            }
        }
    }

}

function renderMatrix() {
    let count = parseInt(elInput.value)
    if (count < 2) {
        alert('Enter at least 2 nodes');
    }
    if (count >= 2) {
        elMatrix.innerHTML = ''
        for (let x = 0; x < count; x++) {
            const elRow = document.createElement('div')
            elMatrix.appendChild(elRow);
            // TODO - добавить span
            elRow.insertAdjacentHTML('beforeend', `<span> ${numberToLetter(x)} </span>`)
            // y <= x вывод "лестницей"
            for (let y = 0; y < count; y++) {
                const elCell = document.createElement('input');
                elCell.type = 'text';
                elCell.id = x + '_' + y;
                if (x === y) {
                    elCell.value = `0`;
                }
                //elCell.addEventListener('change', changeCell);
                elRow.appendChild(elCell);
            }
        }
    }
}

const dijkstraTrigger = () => {
    let array = createArray();
    let result = dijkstra(array, elInputStart, elInputEnd);
}

const canvasTrigger = () => {
    let array = createArray();
    renderCanvas(array);
}

elInput.addEventListener('change', renderMatrix)
elMatrixTrigger.addEventListener('click', renderMatrix)
elCanvasTrigger.addEventListener('click', canvasTrigger)
elAlgorithmTrigger.addEventListener('click', dijkstraTrigger)

