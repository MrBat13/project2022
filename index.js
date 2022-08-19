const elApply = document.querySelector('#btnApply')
const elNodesCount = document.querySelector('#tbNodesCount')
const elMatrix = document.querySelector('#divMatrix')
const elGraph = document.querySelector('#canvasGraph')


const createMatrixModel = () => {
    const count = parseInt(elNodesCount.value);
    const model = [];
    for (let x = 0; x < count; x++){
        model[x] = [];
        for (let y = 0; y < count; y++){
            let node = document.getElementById(x + '_' + y);
            model[x][y] = node.value;
        }
    }
    return model;
}
//я хотел сделать так, если в матрице элемент равен 0, значит нет ячейки => нет соседей, нет веса. но мой код
const convertMatrixModelToGraph = (model) => {
    const graph = [];
    const count = parseInt(elNodesCount.value);
    for (let x = 0; x < count; x++) {
        graph[x] = [];
        for (let y = 0; y < count; y++) {
            if (model[x][y] !== 0) {
                graph[x][y] = {to: `Node${x}`, weight: model[x][y]};
            }
            if (model[x][y] === '0' || model[x][y] === ''){
                graph[x][y] = ''
            }
        }
    }
    console.table(graph);
    return graph;

}

const renderGraph = (graph) => {
    // отрисовка
    const ctx = elGraph.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, elGraph.width, elGraph.height)
    const cnt = graph.length
    const step = 360.0 / cnt * Math.PI / 180

    let w = window.innerWidth;
    let h = window.innerHeight;
    const w2 = w / 2;
    const h2 = h / 2;
    const r = 100;

    let i = 0
    for (let node of graph) {

        const x = Math.cos(i * step) * r
        const y = Math.sin(i * step) * r

        ctx.beginPath();
        ctx.ellipse(w2 + x, h2 + y, 50, 50, 0, 0, 2 * Math.PI);
        ctx.fillText(`Node${i}`, w2 + x, h2 + y);
        ctx.stroke();
        i++
    }


}


changeCell = () => {
    const matrixModel = createMatrixModel();
    const graph = convertMatrixModelToGraph(matrixModel);
    renderGraph(graph);
}


elApply.addEventListener('click', () => {
    let count = parseInt(elNodesCount.value)
    if (count < 2) {
        alert('Enter at least 2 nodes');

    }

    elMatrix.innerHTML = ''
    for (let x = 0; x < count; x++) {
        const elRow = document.createElement('div')
        elMatrix.appendChild(elRow);
        // TODO - добавить span
        elRow.insertAdjacentHTML('beforeend', `<span> Node ${x}</span>`)

        for (let y = 0; y < count; y++) {
            const elCell = document.createElement('input');
            elCell.type = 'text';
            elCell.id = x + '_' + y;
            if (x === y) {
                elCell.value = `0`;
            }
            elCell.addEventListener('change', changeCell);
            elRow.appendChild(elCell);
        }
    }
})