import {numberToLetter} from "../index.js";

/*
array[x] = [{...},{from: '', to: '', weight: ''}, {...}]
 */
const V = document.getElementById('inputBox').value;

export function randomMatrix() {
    // A B C D E F G H I
    // 0 1 2 3 4 5 6 7 8

    let array = new Array(V);
    for (let x = 0; x < V; x++) {
        array[x] = new Array(V);
        for (let y = 0; y <= x; y++) {
            if (x === y) {
                array[x][y] = 0;
            } else {
                array[x][y] = {from: numberToLetter(y), to: numberToLetter(x), weight: Math.floor(Math.random() * 21)}
                array[y][x] = array[x][y];
            }
        }
    }
    console.log(array)
    return array;
}


function minDistance(dist,sptSet) {
    // Initialize min value
    let min = Infinity;
    let min_index = -1;

    for (let v = 0; v < V; v++) {
        if (sptSet[v] === false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

function printSolution(dist, src, dest) {
    console.log(`From ${src} To ${dest}`);
    let sum = 0
    for (let i = 0; i < V; i++) {
        sum += dist[i];
    }
    console.log(sum);
}

export function dijkstra(src, dest) {
    let graph = randomMatrix();
    let dist = new Array(V);
    let sptSet = new Array(V);

    for (let i = 0; i < V; i++) {
        dist[i] = Infinity;
        sptSet[i] = false;
    }

    dist[src] = 0;

    // Find the shortest path for all vertices
    for (let count = 0; count < V; count++) {
        let u = minDistance(dist, sptSet);
        sptSet[u] = true;

        for (let v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] !== 0 &&
                dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    // Print the constructed distance array
    printSolution(dist, src, dest);
}