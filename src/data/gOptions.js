export const goptions = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'en',
    interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false,
        // hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: true,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: false,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: false,
        tooltipDelay: 300,
        zoomSpeed: 1,
        zoomView: true,

    },
    physics: {
        stabilization: true,
        // solver: "forceAtlas2Based",
        enabled: true,
    },
    layout: {
        randomSeed: undefined,
        improvedLayout: true,
        clusterThreshold: 150,
        hierarchical: {
            enabled: false,
            levelSeparation: 150,
            nodeSpacing: 100,
            // edgeSpacing: 150,
            treeSpacing: 100,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'DU',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
            shakeTowards: 'leaves'  // roots, leaves
        }
    }
};

export const gnodeOptions = {
    borderWidth: 2,
    borderWidthSelected: 3,
    color: {
        background: '#01052b',
        border: '#000000',
        highlight: {
            background: '#2F3E46',
            border: "#000000",
        },
    },
    font: {
        color: "#ffffff",
        size: 15, // px
        face: 'arial',
        highlight: {
            color: "#000000",
        }
    },
    physics: true
}

export const gedgeOptions = {
    color: {
        color: "#00fff2",
    },
    font: {
        color: '#000000',
        size: 18, // px
        face: 'arial',
        background: 'none',
        strokeWidth: 5, // px
        strokeColor: '#ffffff',

    },
    width: 2,
}