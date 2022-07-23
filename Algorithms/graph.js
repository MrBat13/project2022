const cy = cytoscape({
    container: document.getElementById('cy'),

    elements: [
        {
            data: {id: 'a'}
        },
        {
            data: {id: 'b'}
        },
        {
            data: {id: 'ab', source: 'a', target: 'b'}
        }
    ],
    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#000',
                'label': 'data(id)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#000',
                'target-arrow-color': '#000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ],

    layout: {
        name: 'grid',
        rows: 1
    },

    userZoomingEnabled: true
});
