let nodes = null;
let edges = null;
let network = null;
// randomly create some nodes and edges
let seed = 5;

class Node{
    #vertices = new Set();
    #adjacentList = new Map();

    get vertices(){
        return Array.from(this.#vertices)
    }

    get adjacentList(){
        const list = {};

        this.#adjacentList.forEach((val,key) =>{
            list[key] = Array.from(val)
        })
        return list;
    }
    addVertex(vertex = null) {
        if(
            !this.#vertices.has(vertex) &&
            vertex !== null &&
            vertex !== undefined
        ) {
            this.#vertices.add(vertex);
            this.#adjacentList.set(vertex, new Set());
        }
    }
}


function getScaleFreeNetwork(nodeCount) {
    const nodes = [];
    const edges = [];
    const connectionCount = [];

    // randomly create some nodes and edges
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            id: i,
            label: String(i),
        });

        connectionCount[i] = 0;

        // create edges in a scale-free-network way
        if (i === 1) {
            const from = i;
            const to = 0;
            edges.push({
                from: from,
                to: to,
                label: `${Math.floor(Math.random()*20) +1}`
            });
            connectionCount[from]++;
            connectionCount[to]++;
        } else if (i > 1) {
            const conn = edges.length * 2;
            const rand = Math.floor(Math.random() * conn);
            let cum = 0;
            let j = 0;
            while (j < connectionCount.length && cum < rand) {
                cum += connectionCount[j];
                j++;
            }

            const from = i;
            const to = j;
            edges.push({
                from: from,
                to: to,
                label: `${Math.floor(Math.random()*20)+1}`
            });
            connectionCount[from]++;
            connectionCount[to]++;
        }
    }

    return {nodes: nodes, edges: edges};
}



function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function draw(data) {
    destroy();
    nodes = [];
    edges = [];

    // create a network
    let container = document.getElementById("myCanvas");
    let options = {
        layout: {randomSeed: seed}, // just to make sure the layout is the same when the locale is changed
        manipulation: {
            addNode: function (data, callback) {
                // filling in the popup DOM elements
                document.getElementById("node-operation").innerText = "Add Node";
                editNode(data, clearNodePopUp, callback);
            },
            editNode: function (data, callback) {
                // filling in the popup DOM elements
                document.getElementById("node-operation").innerText = "Edit Node";
                editNode(data, cancelNodeEdit, callback);
            },
            addEdge: function (data, callback) {
                if (data.from === data.to) {
                    let r = confirm("Do you want to connect the node to itself?");
                    if (r !== true) {
                        callback(null);
                        return;
                    }
                }
                document.getElementById("edge-operation").innerText = "Add Edge";
                editEdgeWithoutDrag(data, callback);
            },
            editEdge: {
                editWithoutDrag: function (data, callback) {
                    document.getElementById("edge-operation").innerText = "Edit Edge";
                    editEdgeWithoutDrag(data, callback);
                },
            },
        },
    };
    network = new vis.Network(container, data, options);
}

function editNode(data, cancelAction, callback) {
    document.getElementById("node-label").value = data.label;
    document.getElementById("node-saveButton").onclick = saveNodeData.bind(
        this,
        data,
        callback
    );
    document.getElementById("node-cancelButton").onclick = cancelAction.bind(
        this,
        callback
    );
    document.getElementById("node-popUp").style.display = "block";
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
    document.getElementById("node-saveButton").onclick = null;
    document.getElementById("node-cancelButton").onclick = null;
    document.getElementById("node-popUp").style.display = "none";
}

function cancelNodeEdit(callback) {
    clearNodePopUp();
    callback(null);
}

function saveNodeData(data, callback) {
    data.label = document.getElementById("node-label").value;
    clearNodePopUp();
    callback(data);
}

function editEdgeWithoutDrag(data, callback) {
    // filling in the popup DOM elements
    document.getElementById("edge-label").value = data.label;
    document.getElementById("edge-saveButton").onclick = saveEdgeData.bind(
        this,
        data,
        callback
    );
    document.getElementById("edge-cancelButton").onclick = cancelEdgeEdit.bind(
        this,
        callback
    );
    document.getElementById("edge-popUp").style.display = "block";
}

function clearEdgePopUp() {
    document.getElementById("edge-saveButton").onclick = null;
    document.getElementById("edge-cancelButton").onclick = null;
    document.getElementById("edge-popUp").style.display = "none";
}

function cancelEdgeEdit(callback) {
    clearEdgePopUp();
    callback(null);
}

function saveEdgeData(data, callback) {
    if (typeof data.to === "object") data.to = data.to.id;
    if (typeof data.from === "object") data.from = data.from.id;
    data.label = document.getElementById("edge-label").value;
    clearEdgePopUp();
    callback(data);
}

export function init() {
    let V = document.getElementById('inputBox').value;
    let data = getScaleFreeNetwork(V);
    draw(data);
    console.log(data);
}
