$(document).ready(function () {

    dataset = []
    const colors = [
        "#AF4D98", "#D66BA0", "#E5A9A9", "#F4E4BA", "#FF3C38",
        "#6699CC", "#FFF275", "#FF8C42", "#00C9A7", "#FF6B6B",
        "#00B8D4", "#FFB72C", "#42A5F5", "#9C27B0", "#F44336",
        "#FFC107", "#4CAF50", "#FF9800", "#3F51B5", "#FF4081",
        "#76FF03", "#9E9E9E", "#8E24AA", "#00E5FF", "#F57C00",
        "#78909C", "#4DD0E1", "#1DE9B6", "#D32F2F", "#7C4DFF",
        "#9E9D24", "#03A9F4", "#0288D1", "#D50000", "#8BC34A"
    ];


    function draw_points(data = null, clusters = null, centroids = null) {
        let canvas = $('#canvas')[0];
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // to set the clusters colors, its used the palette from global var 'colors'
        ctx.globalAlpha = 0.8;  // Transparency

        // set color points to black
        ctx.fillStyle = "black";

        if (data != null && clusters == null && centroids == null) {
            // Draw data points
            for (let i = 0; i < data.length; i++) {
                let p = data[i];

                ctx.beginPath();
                ctx.arc(p[0], p[1], 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        else if (data != null && clusters != null && centroids != null) {
            // Draw data points
            for (let i = 0; i < data.length; i++) {
                let p = data[i];

                let clusterIdx = clusters.findIndex(cluster => cluster.includes(i));

                ctx.fillStyle = colors[clusterIdx];
                ctx.beginPath();
                ctx.arc(p[0], p[1], 5, 0, 2 * Math.PI);
                ctx.fill();
            }

            // Draw centroids
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "black";

            // Number of clusters
            const K = clusters.length;

            // Draw centroids
            for (let j = 0; j < K; j++) {
                let c = centroids[j];

                if (Array.isArray(c) && c.length === 2) {
                    // 'X' for centroid
                    ctx.beginPath();
                    ctx.moveTo(c[0] - 8, c[1] - 8);
                    ctx.lineTo(c[0] + 8, c[1] + 8);
                    ctx.moveTo(c[0] - 8, c[1] + 8);
                    ctx.lineTo(c[0] + 8, c[1] - 8);
                    ctx.lineWidth = 3;
                    ctx.stroke();
                } else {
                    console.error('Invalid centroid at index', j, c);
                }
            }
        }
    }


    $('#new-dataset').click(function () {

        $.ajax({
            url: '/new-dataset',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                size: $('#canvas').attr('width')
            }),
            success: function (result) {
                // convert from obj to array
                dataset = result.map(p => [p.x, p.y]);
                draw_points(dataset)
                
                // clear table info
                fill_info_table("","","")
            },
            error: function (error) {
                console.error('Error processing data:', error);
            }
        });
    });

    function fill_info_table(n_points, algorithm_iterations, clusters_applied) {
        $('#n_points_output').text(n_points)
        $('#algorithm_iterations_output').text(algorithm_iterations)
        $('#clusters_applied_output').text(clusters_applied)
    }


    $('#apply-algorithm').click(function () {

        // get the K value from input
        k_val = $('#n_clusters_input').val()

        if (k_val < 2) {
            $('#errorModal').modal('show');
            return
        }

        // send dataset and k_val to clusterizate endpoint
        $.ajax({
            url: '/clusterizate',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                dataset: dataset,
                k_val: k_val
            }),
            success: function (result) {

                // split data in clusters and centroids
                const clusters = result.clusters
                const centroids = result.centroids
                const iterations = result.iterations

                // draw with all info
                draw_points(dataset, clusters, centroids)
                fill_info_table(dataset.length, iterations, clusters.length)
            },
            error: function (error) {
                console.error('Error processing data:', error);
            }
        });
    });


    // show instructions
    $('#show-instructions').click(function () {
        $('#instructionsModal').modal('show');
    });
})