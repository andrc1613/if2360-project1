var n_poly = 3
var n_after = 0

var changeNPoly = function() {
    if (document.getElementById("n-poly").value < 3) {
        window.alert("Silakan masukkan nilai minimal 3");
        document.getElementById("n-poly").value = 3;
        return;
    }
    n_poly = document.getElementById("n-poly").value
    console.log("Changed npoly : " + n_poly)
}

var setPolygon = function() {
    isLine = false
    isSquare = false
    isPolygon = true
    console.log("isPloygon " + isPolygon)
}

var drawPolygon = function(x, y) {
    console.log("Drawing polygon")
    console.log("Current Point poly" + n_after)
    if (n_after < n_poly) {
        vertices.push(x)
        vertices.push(y)
        vertices.push(rgb[0]/255)
        vertices.push(rgb[1]/255)
        vertices.push(rgb[2]/255)
        n_after++
        console.log("vertices" + vertices)
        renderAll()
        if (n_after < n_poly) {
            main(vertices, n_after, gl.TRIANGLE_FAN)
        } else {
            renderObject(vertices, n_after, gl.TRIANGLE_FAN)
        }
    }

    if (n_after == n_poly) {
        arrObjects.push({
            vert: vertices,
            meth: gl.TRIANGLE_FAN,
            n: n_after,
            p: points,
            type: "polygon"
        })
        console.log(arrObjects)
        vertices = []
        n_after = 0
        isPolygon = false
        points = []
    }
}