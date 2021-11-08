function Cube(x, y, s, orbit) {
    this.pos = createVector(x, y, 0);
    this.vel = createVector(-x, y, 0); //p5.Vector.random2D();
    this.acc = createVector();
    this.s = s;
    this.rotate = orbit;
    this.angle = 0;

    this.display = function () {
        push();
        translate(this.pos.x, this.pos.y);
        if (this.rotate === true) {
            rotateX(this.angle);
            rotateY(this.angle);
            rotateZ(this.angle);
        } else {
            rotateX(-PI / 6);
            rotateY(-PI / 4);
        }
        //noStroke();
        if (this.rotate == false) {
            
            //fill(hexToRgb('#c874b2'));
            stroke(hexToRgb('#f5d5e0'));
            //stroke(243, 240, 215);
            strokeWeight(2);

        } else {
    
            stroke(hexToRgb('#210535'));
            fill(hexToRgb('#f5d5e0'));
        }
        box(this.s);
        this.angle += 0.025;
        pop();
    }

    this.attract = function (target) {
        var force = new p5.Vector();
        force = p5.Vector.sub(target.pos, this.pos);
        var d = force.magSq();
        d = constrain(d, 1, 25);
        var G = 1;
        var strength = G / d;
        force.setMag(strength);
        this.acc.add(force);
    }

    this.orbit = function () {
        this.vel.add(this.acc);
        this.vel.limit(3);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}


function hexToRgb(hex) {
    hex = hex.replace('#', '');

    var bigint = parseInt(hex, 16);

    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return color(r, g, b);
}