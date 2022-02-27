var setSquare = function() {
    isLine = false
    isSquare = true
    isPolygon = false

}

var drawSquare = function(x, y){
    vertices = getSquare(x,y)
    console.log("vertices" + vertices)
    const titik = 4
    renderObject(vertices, titik, gl.TRIANGLE_FAN) 
    arrObjects.push({
        vert: vertices,
        meth: gl.TRIANGLE_FAN,
        n: 4,
        p: points,
        type: "square"
    })
    console.log(arrObjects)
    vertices = []
    points = []
    isSquare = false
    renderAll()
}

var getSquare = function(x, y) {
    return [
        x-1/2, y+1/2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
        x+1/2, y+1/2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
        x+1/2, y-1/2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
        x-1/2, y-1/2, rgb[0]/255, rgb[1]/255, rgb[2]/255
    ]
}

var changeScaleX = function(){
    Sx = document.getElementById("scale-x").value
}

var fixSquare = function (vertice , idx, x, y){
    vertice[idx * 5] = x
    vertice[idx * 5 + 1] = y 
    if (idx == 0){
        vertice[5] = vertice[10]
        vertice[6] = y
        vertice[15] = x
        vertice[16] = vertice[11]
    }else if (idx == 1){
        vertice[0] = vertice [15]
        vertice[1] = y
        vertice[10] = x
        vertice[11] = vertice[16]
    }else if(idx == 2){
        vertice[5] = x
        vertice[6] = vertice[1]
        vertice[15] = vertice[0]
        vertice[16] = y
    }else{
        vertice[0] = x
        vertice[1] = vertice[6]
        vertice[10] = vertice[5]
        vertice[11] = y
    }
    return vertice
}

var fixPoints = function(vertice){
    for (var i=0; i<vertice.length; i+=5) {
        var sq_point = getSquarePoint(vertice[i], vertice[i+1])
        points.push(sq_point)
    }
}

var changeScaleY = function(){
    Sy = document.getElementById("scale-y").value
}