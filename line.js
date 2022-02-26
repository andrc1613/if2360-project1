var first_p = true;

var setLine = function() {
    isLine = true;
    isSquare = false;
    isPolygon = false;

    // debugging
    // console.log(isLine, isSquare, isPolygon);
}

var drawLine = function (x, y) {
    // push vertices
    vertices.push(x);
    vertices.push(y);
    vertices.push(rgb[0]/255);
    vertices.push(rgb[1]/255);
    vertices.push(rgb[2]/255);
    
    // render all created objects    
    renderAll();

    if (first_p) {
        // first point has been clicked
        first_p = false;
    } else {
        // reinitialize first point
        first_p = true;

        // render line
        main(vertices, 2, gl.LINES);
        
        // render points
        renderObject(vertices, 2, gl.TRIANGLE_FAN);

        // push object
        arrObjects.push({
            vert: vertices,
            meth: gl.LINES,
            n: 2,
            p: points,
            type: "line"
        })

        // debugging
        // console.log(arrObjects);

        // reset
        vertices = [];
        points = [];
        isLine = false;
    }
}