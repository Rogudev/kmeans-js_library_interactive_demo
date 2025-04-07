# K-Means JS Library Interactive Demo

This is an interactive demo for the K-Means clustering algorithm using the Kmeans-js JavaScript library.
The demo allows users to generate random datasets, apply the K-Means algorithm to cluster the data points, and visualize the result on a canvas.


## Features

- **Generate New Dataset**: Creates a random dataset of points.
- **Apply Algorithm**: Run the K-Means clustering algorithm with a customizable number of clusters (between 2 and 8).
- **Visualization**: Displays the dataset and the clustered data points, with centroids marked in yellow.
- **Info Table**: Shows key information like the number of points, the number of iterations the algorithm took, and the number of clusters.
- **Instructions Modal**: A simple modal explaining how to use the demo.


## Requirements

- **Node.js**: You must have Node.js installed on your machine.
- **Express**: To use as backend
- **Bootstrap**: Instead of CSS, this project uses bootstrap.
- **jQuery**: Used for DOM manipulation and AJAX requests.


## Installation

1. Clone this repository:
```bash
   git clone https://github.com/your-username/kmeans-js_library_interactive_demo.git
```

2. Navigate to the project directory
```bash
cd kmeans-js_library_interactive_demo
```
3. Install dependencies
```bash
npm install
```

4. Start the server
```bash
npm start
```
5. Open your browser and go to http://localhost:3000 to see the demo in action.


## How to Use

1. **Generate a new dataset**: Click on the **"Generate new dataset"** button to create random points.
2. **Input the number of clusters**: Enter a value between 2 and 8 in the **"Clusters"** input field.
3. **Apply the K-Means algorithm**: Click on the **"Apply"** button to run the algorithm and see the clustering results on the canvas.
4. **View the information**: Check the table below the canvas for details about the dataset, such as the number of points, the number of iterations, and the number of clusters.




## License

This project is licensed under the MIT License - see the information below for details.


MIT License

Copyright (c) 2025 Rodrigo Gutierez Ribal [rogudev.com](https://rogudev.com/es)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.