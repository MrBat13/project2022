'use strict';
class Graph {
    constructor() {
        this.adjencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjencyList[vertex]) {
            this.adjencyList[vertex] = [];
        }
    }

    addEdge(source, destination) {
        if (!this.adjencyList[source]) {
            this.addVertex(source);
        }
        if (!this.adjencyList[destination]) {
            this.addVertex(destination);
        }
        this.adjencyList[source].push(destination);
        this.adjencyList[destination].push(source);
    }

    removeEdge(source, destination) {
        this.adjencyList[source] = this.adjencyList[source].filter(vertex => vertex !== destination);
        this.adjencyList[destination] = this.adjencyList[destination].filter(vertex => vertex !== source);
    }

    removeVertex(vertex){
        while (this.adjencyList[vertex]) {
            const adjacentVertex = this.adjencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjencyList[vertex];
    }
}

import { DataSet } from "vis-data/peer";
import { Network } from "vis-network/peer";
import "vis-network/styles/vis-network.css";

const nodes = new DataSet([
    {id: 1, label: "Node 1"},
    {id: 2, label: "Node 2"},
    {id: 3, label: "Node 3"},
    {id: 4, label: "Node 4"},
    {id: 5, label: "Node 5"}
]);

const edges = new DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

const container = document.getElementById('network');
const data = {
    nodes: nodes,
    edges: edges
};
const options = {};

const network = new Network(container, data, options);