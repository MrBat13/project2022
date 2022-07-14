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