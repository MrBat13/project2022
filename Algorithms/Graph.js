class undirectedGraph{
    constructor(numberOfVertices) {
        this.numberOfVertices = numberOfVertices;
        this.adjacent = new Map();
    }

    addVertex(v) {
        this.adjacent.set(v,[])
    }

    addEdge(v, w) {
        this.adjacent.get(v).push(w);
    }

    printGraph(){
        var getKeys = this.adjacent.keys();

        for (var i of getKeys){
            let get_values = this.adjacent.get(i);
            var temp = "";

            for (var j of get_values)
                temp += j + " ";
        }
        console.log(i + " ->" + temp);
    }
}

class directedGraph{
    constructor(numberOfVertices) {
        this.numberOfVertices = numberOfVertices;
        this.adjacent = new Map();
    }

    addVertex(v) {
        this.adjacent.set(v,[])
    }

    addEdge(v, w) {
        this.adjacent.get(v).push(w);
        this.adjacent.get(w).push(v);
    }
}