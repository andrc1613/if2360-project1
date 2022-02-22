const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

canvas.width = 700;
canvas.height = 700;
if (!gl) {
    throw new Error('WebGL not supported');
}

//Translasi ditandai dengan Ti
//changeable for moving the quad
var Tx = 0;
var Ty = 0;
const Tz = 0;

//Scaling ditandai dengan Si
//changeable for changing the size
var Sx = 1;
var Sy = 1;
const Sz = 1;
var xformMatrix = new Float32Array([
    Sx, 0.0, 0.0, 0.0,
    0.0, Sy, 0.0, 0.0,
    0.0, 0.0, Sz, 0.0,
    0.0, 0.0, 0.0, 1.0
]);


const vertexData = [
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0
];

const colorData = [
    1, 0, 0, //red (R, G, B)
    1, 0, 0, //red
    1, 0, 0, //red
    1, 0, 0, //red
];


// create position buffer
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// create color buffer
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

//vertex code
var vertexCode = 
`precision mediump float;

attribute vec4 position;
uniform mat4 u_xformMatrix;
uniform vec4 translation;
attribute vec3 color;
varying vec3 vColor;
void main() {
    vColor = color;
    gl_Position = (u_xformMatrix * position) + translation;
}`;

// create vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexCode);
gl.compileShader(vertexShader);

//fragment code
var fragCode =
`precision mediump float;

varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1);
}`;
// create fragment shader
const fragmentShader =gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader,fragCode);
gl.compileShader(fragmentShader);

// create Program
const program =gl.createProgram();
// attach shader to program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//scaling
var u_xformMatrix = gl.getUniformLocation(program, 'u_xformMatrix');
gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

// enable vertex atribut
const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

//Translation
var translation = gl.getUniformLocation(program, 'translation');
gl.uniform4f(translation, Tx, Ty, Tz, 0.0);

// draw
gl.clearColor(0.5, 0.5, 0.5, 0.9);
gl.enable(gl.DEPTH_TEST);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0,0,canvas.width,canvas.height);
gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
