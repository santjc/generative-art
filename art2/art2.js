var mainCube;
var orbitaCubes;
var img;
let _text;

function setup() {
    createCanvas(672, 480, WEBGL);
    c2 = hexToRgb('#210535');
    c1 = hexToRgb('#f5d5e0');
    background(hexToRgb('#210535'));
    for (let y = 0; y < height; y++) {
        n = map(y, 0, height, 0, 1);
        let newc = lerpColor(c1, c2, n);
        stroke(newc);
        strokeWeight(1);

        rotate(radians(135));
        line(-width, y, width, y);
    }
    mainCube = new Cube(0, 0, width / 6, false);
    orbitaCubes = new Cube(-width / 4, -height / 4, width / 15, true);
    ortho();
    mainCube.display();


    // frameRate(60)
    // createLoop({
    //     duration: 15,
    //     gif: true
    // })

}

function draw() {
    orbitaCubes.display();
    orbitaCubes.attract(mainCube);
    orbitaCubes.orbit();
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    var bigint = parseInt(hex, 16);

    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return color(r, g, b);
}