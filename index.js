const elApply = document.querySelector('#btnApply')
const elNodesCount = document.querySelector('#tbNodesCount')
const elMatrix = document.querySelector('#divMatrix')
const elGraph = document.querySelector('#canvasGraph')


const createMatrixModel = () => {
    // TODO заменить на обход DOM дерева
    const count = parseInt(elNodesCount.value);
    const model = [];
    for (let x = 0; x < count; x++){
        model[x] = [];
        for (let y = 0; y < count; y++){
            let node = document.getElementById(x +'_'+ y);
            model[x][y] = node.value;
        }
    }
    return model;
}

const convertMatrixModelToGraph = (model) => {
    // TODO преобразовать матрицу в дерево
/*    const count = parseInt(elNodesCount.value);
    for (let x = 0; x < count; x++){
        for (let y = 0; y < count; y++){

            //model[x][y] = '';
        }
    }*/



    const node1 = { name : 'Узел 1', links : [] }
    const node2 = { name : 'Узел 2', links : [] }
    const node3 = { name : 'Узел 3', links : [] }
    node1.links = [{ link : node2, distance : 800}, {link : node3, distance: 500}]
    node2.links = [{ link : node3, distance : 400}]
    return [node1, node2, node3]
}

const renderGraph = (model) => {
    // отрисовка
    const ctx = elGraph.getContext('2d');

    const cnt = model.length
    const step = 360.0 / cnt * Math.PI / 180

    // TODO - получит реальные размеры области вместо констант
    const w = 800;
    const h = 600;
    const w2 = w * 0.5
    const h2 = h * 0.5
    const r = 200

    let i = 0
    for (let node of model) {

        const x = Math.cos(i * step) * r
        const y = Math.sin(i * step) * r

        ctx.beginPath();
        ctx.ellipse(w2 + x, h2 + y, 50, 50, 0, 0, 2 * Math.PI);

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
    if (count<2){
        alert('Enter at least 2 nodes');
    } else count +=1;

    elMatrix.innerHTML = ''
    for (let x = 1; x < count; x++) {
        const elRow = document.createElement('div')
        elMatrix.appendChild(elRow);
        // TODO - добавить span
        elRow.insertAdjacentHTML('beforeend',`<span> Node ${x}</span>`)

        for (let y = 1; y < count; y++) {
            const elCell = document.createElement('input');
            elCell.type = 'text';
            elCell.id = x + '_' + y;
            if (x === y){
                elCell.value = '0';
            }
            elCell.addEventListener('change', changeCell);
            elRow.appendChild(elCell);
        }
    }
})