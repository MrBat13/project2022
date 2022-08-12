const elApply = document.querySelector('#btnApply')
const elNodesCount = document.querySelector('#tbNodesCount')
const elMatrix = document.querySelector('#divMatrix')
const elGraph = document.querySelector('#canvasGraph')



const createMatrixModel = () => {
    // TODO заменить на обход DOM дерева
    return [ [0, 1, 1], [1, 1, 1], [0, 1, 0]]
}

const convertMatrixModelToGraph = (model) => {
    // TODO преобразовать матрицу в дерево

}

const renderGraph = (model) => {
    // отрисовка
    const ctx = elGraph.getContext('2d')

    ctx.beginPath();
    ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
}


changeCell = () => {
    const matrixModel = createMatrixModel()
    const graph = convertMatrixModelToGraph(matrixModel)
    renderGraph(graph)
}


elApply.addEventListener('click', () => {
    const count = parseInt(elNodesCount.value)
    elMatrix.innerHTML = ''
    for (let y = 0; y < count; y++) {
        const elRow = document.createElement('div')
        elMatrix.appendChild(elRow);
        for (let x = 0; x < count; x++) {
            const elCell = document.createElement('input')
            elCell.type = 'text'
            elCell.addEventListener('change', changeCell)
            elRow.appendChild(elCell)
        }
    }
})