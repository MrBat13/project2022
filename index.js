const elApply = document.querySelector('#btnApply')
const elNodesCount = document.querySelector('#tbNodesCount')
const elMatrix = document.querySelector('#divMatrix')
const elGraph = document.querySelector('#canvasGraph')


const createMatrixModel = () => {
    // TODO заменить на обход DOM дерева
    const count = parseInt(elNodesCount.value)
    const model = [];
    for (let x = 0; x < count; x++){
        model[x] = [];
        for (let y = 0; y < count; y++){
            let node = document.getElementById(x +''+ y);
            model[x][y] = node.value;
        }
    }
    model.forEach(function (entry){
        console.table(entry);
    });
    return model;
}

const convertMatrixModelToGraph = (model) => {
    // TODO преобразовать матрицу в дерево

}

const renderGraph = (model) => {
    // отрисовка
    const ctx = elGraph.getContext('2d');

/*    ctx.beginPath();
    ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();*/
}


changeCell = () => {
    const matrixModel = createMatrixModel();
    const graph = convertMatrixModelToGraph(matrixModel);
    renderGraph(graph);
}


elApply.addEventListener('click', () => {
    const count = parseInt(elNodesCount.value) // <2 должен выводить ошибку; =>2  +1 к числу
    elMatrix.innerHTML = ''
    for (let x = 0; x < count; x++) {
        const elRow = document.createElement('div')
        elMatrix.appendChild(elRow);
        for (let y = 0; y < count; y++) {
            const elCell = document.createElement('input');
            elCell.type = 'text';
            elCell.id = x + '' + y;
            elCell.addEventListener('change', changeCell);
            elRow.appendChild(elCell);
        }
    }
})