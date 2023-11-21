/**
 * Represents a p5.js sketch.
 * @param {p5} p - The p5.js instance.
 */
let colorInput = document.getElementById('color');
let weight = document.getElementById('size-slider');
let paths = [];
let currentPath = [];
let pg;
let textBoxes = [];
let mode = 'draw'; // Inicialmente en modo de dibujo

let sketch = function(p) {
    p.setup = function() {
        const container = document.getElementById('canvas-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const canvas = p.createCanvas(containerWidth, containerHeight);
        canvas.parent('canvas-container');
        pg = p.createGraphics(containerWidth, containerHeight);
    }

    document.getElementById('add-text-box').addEventListener('click', function() {
        const textBox = {
            x: 50,
            y: 50,
            text: 'Texto aquí',
            isSelected: false
        };
        textBoxes.push(textBox);
    });

    document.getElementById('toggle-mode').addEventListener('click', function() {
        if (mode === 'draw') {
            mode = 'text';
        } else {
            mode = 'draw';
        }
    });

    p.mousePressed = function() {
        if (mode === 'draw') {
            if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                const point = {
                    x: p.mouseX,
                    y: p.mouseY,
                    color: colorInput.value,
                    weight: weight.value
                };
                currentPath.push(point);
            }
        } else {
            textBoxes.forEach(textBox => {
                if (p.mouseX > textBox.x && p.mouseX < textBox.x + 100 && p.mouseY > textBox.y && p.mouseY < textBox.y + 20) {
                    textBox.isSelected = true;
                } else {
                    textBox.isSelected = false;
                }
            });
        }
    }

    p.mouseDragged = function() {
        if (mode === 'draw') {
            if (p.mouseIsPressed && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                const point = {
                    x: p.mouseX,
                    y: p.mouseY,
                    color: colorInput.value,
                    weight: weight.value
                };
                currentPath.push(point);
            }
        } else {
            textBoxes.forEach(textBox => {
                if (textBox.isSelected) {
                    textBox.x = p.mouseX;
                    textBox.y = p.mouseY;
                }
            });
        }
    }

    p.draw = function() {
        p.background(255);
        p.image(pg, 0, 0);

        textBoxes.forEach(textBox => {
            p.text(textBox.text, textBox.x, textBox.y);
        });

        paths.forEach(path => {
            for (let i = 1; i < path.length; i++) {
                let prevPoint = path[i - 1];
                let currPoint = path[i];
                pg.stroke(currPoint.color);
                pg.strokeWeight(currPoint.weight);
                pg.line(prevPoint.x, prevPoint.y, currPoint.x, currPoint.y);
            }
        });
    }
}

let myp5 = new p5(sketch);

function clearCanvas() {
    textBoxes = [];
    paths = [];
    currentPath = [];
    pg.clear();
}

document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('download').addEventListener('click', function() {
    myp5.saveCanvas('myDrawing', 'jpg');
});
