    //RED 230,60,40
    //BLACK 28,30,25
    //WHITE 245,240,225


    var colors = [];
    let circles = [];
    let branches = [];
    let lines = [];
    let eyes = [];


    let len = 115;


    var fractals = [];


    function setup() {
        createCanvas(1200, 900);
        let _WHITE = color(245, 240, 225);
        let _BLACK = color(28, 30, 25);
        let _RED = color(230, 60, 40);

        colors.push(_WHITE);
        colors.push(_BLACK);
        colors.push(_RED);
        for (let x = 0; x < width * 1.5; x += width / 10) {
            for (let y = height * 0.33; y < height; y += height / 7.5) {
                let newCircle = new Circle(x, y, width);
                circles.push(newCircle);
            }
        }


    }

    function divide(x, y, l, lvl, max) {
        if (lvl == max) {
            tri(x, y, l);
        } else {
            divide(x, y, l / 2, lvl + 1, max);
            divide(x + l / 2, y, l / 2, lvl + 1, max);
            divide(x + l / 4, y - l * sqrt(3) / 4, l / 2, lvl + 1, max);
        }
    }

    function tri(x, y, l) {
        let _WHITE = color(245, 240, 225);
        let _BLACK = color(28, 30, 25);
        let _RED = color(230, 60, 40);
        let _GREEN = color(125, 140, 0);
        fill(_RED);
        strokeWeight(1);
        stroke(_BLACK)
        smooth();
        triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
    }

    function draw() {
        let _GREEN = color(125, 140, 0);
        let _BLACK = color(28, 30, 25);
        let _WHITE = color(245, 240, 225);
        let _RED = color(230, 60, 40);
        background(245, 240, 225);



        for (let x = 0; x < width + 100; x += width / 10) {
            for (let y = height - 50; y < height; y += height / 9) {
                divide(x - len / 2, y + len * sqrt(3) / 4, len, 0, 2);
            }
        }
        push();
        (new Ring(width/2, height * 1.5, width / 2, -10, 8,_RED,_BLACK)).render();
        (new Ring(0, height/2, width / 4, 2, 8,_BLACK,_WHITE)).render();
        (new Ring(width, height/2, width / 4, -10, 8,_RED,_WHITE)).render();
        pop();

        circles.forEach(circle => {
            //circle.display();
        });
        textSize(width / 6);
        textAlign(CENTER, CENTER);
        fill(_GREEN);
        stroke(_BLACK);
        strokeWeight(2);
        text("サンコ", width / 2, height / 4);










    }

    class Line {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.s = 4;
            this.originalPos = x;
            this.behave = true;

            this.randomY = random(-height, height);
            this.randomX = random(-width, width);

            this.speed = random(0.001, 0.001);
            this.angle = 0;


        }

        display() {
            strokeWeight(8);
            fill(28, 30, 25);
            line(this.x, 0, this.x, this.y);
        }


    }

    function Branch(begin, end) {
        this.begin = begin;
        this.end = end;
        this.finished = false;
        this.display = function () {
            strokeWeight(8);
            fill(28, 30, 25);
            line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        }

    }

    function Ring(x, y, r, lean, level,colorBG,colorST) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.lean = lean;
        this.level = level;
        let _WHITE = color(245, 240, 225);
        let _BLACK = color(28, 30, 25);
        let _RED = color(230, 60, 40);
        this.render = function () {
            strokeWeight(2);
            stroke(colorST);
            // noStroke();
            ellipseMode(RADIUS);
            noSmooth();
            fill(colorBG);
            circle(this.x, this.y, this.r);
            if (this.level > 1) {
                //rotate(random(PI));
                push();
                translate(lean * Math.sqrt(2 * Math.pow(this.r / 2, 2)) / 2,
                    Math.sqrt(2 * Math.pow(this.r / 2, 2)) / 2);
                (new Ring(this.x, this.y, this.r / 2, -this.lean, this.level - 1,colorBG,colorST)).render();
                pop();

                push();
                translate(-lean * Math.sqrt(2 * Math.pow(this.r / 2, 2)) / 2,
                    -Math.sqrt(2 * Math.pow(this.r / 2, 2)) / 2);
                (new Ring(0, 0, this.r / 2, -this.lean, this.level - 1,colorBG,colorST)).render();
                pop();
            }
        }
    }
    class Circle {
        constructor(x, y, s) {
            this.x = x;
            this.y = y;
            this.s = s;
            this.originalPosX = x;
            this.originalPosY = y;

            this.randomY = random(0, height);
            this.randomX = random(0, width);
            this.behave = true;

            this.angle = 0;
            this.speed = 0.001;
        }


        display() {


            push();
            ellipseMode(CENTER);
            smooth();
            noStroke();
            fill(230, 60, 40, 255);
            strokeWeight(2);
            stroke(28, 30, 25)
            rotate(0.5);
            circle(this.x, this.y, (this.s / 10));
            ellipseMode(CENTER);
            strokeWeight(2);
            fill(245, 240, 225);
            stroke(28, 30, 25)
            circle(this.x, this.y * 0.9, (this.s / 10));
            if (this.x > width / 4) {
                fill(28, 30, 25);

            }
            if (this.x < width / 4 || this.x > width * 0.75) {
                fill(230, 60, 40);
            }
            stroke(245, 240, 225)
            circle(this.x, this.y * 0.8, (this.s / 10));
            pop();
        }

        breathe() {
            if (this.behave && floor(this.x) != floor(this.randomX) && floor(this.y) != floor(this.randomY)) {
                this.x = lerp(this.x, this.randomX, 0.15);
                this.y = lerp(this.y, this.randomY, 0.15);
            } else {
                this.behave = false;
            }

            if (!this.behave && floor(this.x) == floor(this.randomX) && floor(this.y) == floor(this.randomY)) {
                this.x = lerp(this.randomX, this.originalPosX, 0.5)
                this.y = lerp(this.randomY, this.originalPosY, 0.5);
            } else {
                this.behave = true;
            }
        }
    }


    class Eye {
        //RED 230,60,40
        //BLACK 28,30,25
        //WHITE 245,240,225

        constructor(x, y) {
            this.x = x;
            this.y = y;

            this.randomX = random(-10, 10);
            this.randomY = random(-10, 10);
        }
        display() {
            push();
            translate(this.x, this.y)
            strokeWeight(4);
            fill(245, 240, 225);
            ellipse(0, 0, 40, 40);
            strokeWeight(2)


            if (this.x > width / 4) {
                fill(230, 60, 40);
            }
            if (this.x < width / 4 || this.x > width * 0.75) {
                fill(28, 30, 25);
            }


            ellipse(0, 0, 30, 30);
            fill(245, 240, 225)
            stroke(28, 30, 25);
            ellipse(this.randomX, this.randomY, 5, 5);
            pop();
        }
    }