const express = require('express');
const path = require('path');
const cors = require('cors');

var kMeans = require('kmeans-js');

// create app
const app = express();
const port = 3000;

// app consts and vars
let nClusters = Math.floor(Math.random() * 8) + 2;    // from 2 to 4 clusters
const dataCSVpath = path.join(__dirname, 'resources/data.csv'); // create path

app.use(express.json());

app.use(cors());

// static files
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use('/static', express.static(path.join(__dirname, 'static')));

// serve the index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// port usage
app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});


function clusterizate(dataset, k_val) {
    var km = new kMeans({
        K: k_val
    });

    // clusterizate the dataset
    km.cluster(dataset);

    // use centroid algorith
    while (km.step()) {
        km.findClosestCentroids();
        km.moveCentroids();

        if (km.hasConverged()) break;
    }
    
    // return info
    return {
        clusters: km.clusters,
        centroids: km.centroids,
        iterations: km.currentIteration
    };
}

// endpoint to clusterizate the data with the received n_clusters input
app.post('/clusterizate', (req, res) => {
    // extract k_val from the request body
    const k_val = req.body.k_val;
    dataset = req.body.dataset;

    // send dataset to clusterizate function
    const { clusters, centroids, iterations } = clusterizate(dataset, k_val);

    res.json({
        clusters: clusters,
        centroids: centroids,
        iterations: iterations
    });
});




// --------------------------------------------------------------- GEN NEW DATASET ---------------------------------------------------------------

// Function to generate synthetic data
function generateData(nPoints, centers) {
    const points = [];
    for (let center of centers) {
        for (let i = 0; i < nPoints; i++) {
            // Generate points around the center with some randomness
            let x = center.x + (Math.random() - 0.5) * center.desv * (Math.random() * (3 - 1) + 1);
            let y = center.y + (Math.random() - 0.5) * center.desv * (Math.random() * (3 - 1) + 1);

            // Round to 4 decimal places
            x = parseFloat(x.toFixed(4));
            y = parseFloat(y.toFixed(4));

            points.push({ x, y });
        }
    }
    return points;
}

// endpoint to generate synthetic data
app.post('/new-dataset', (req, res) => {
    const size = req.body.size;

    // define the number of centers to points creation
    const nCenters = Math.floor(Math.random() * 50) + 10;

    let centers = [];

    // fill centers
    for (let i = 0; i < nCenters; i++) {
        // use a margin of 30 inside canvas
        const margin = 30;

        // generate random x and y values in range and using the margin
        const randX = Math.random() * (size - 2 * margin) + margin;
        const randY = Math.random() * (size - 2 * margin) + margin;

        // random desviation for clustering
        const randDesv = Math.random() * 80 + 10;

        centers.push({ x: randX, y: randY, desv: randDesv })
    }

    // generate synthetic data
    n_points = Math.floor(Math.random() * 150) + 50;
    const data = generateData(50, centers);  // generate points around each center

    //send data
    res.json(data);
});