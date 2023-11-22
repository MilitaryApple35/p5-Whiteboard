/**
 * Represents a p5.js sketch.
 * @param {p5} p - The p5.js instance.
 */
let colorInput = document.getElementById('color');
let weight = document.getElementById('size-slider');
let paths = [];
let currentPath = [];
let pg;
let myText = '';

window.onload = function() {
    let sketch = function(p) {
        p.setup = function() {
                const container = document.getElementById('canvas-container');
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;
                const canvas = p.createCanvas(containerWidth, containerHeight);
                canvas.style('width', '100%');
                canvas.style('height', '100%');
                canvas.parent('canvas-container');
                pg = p.createGraphics(containerWidth, containerHeight);
                pg.pixelDensity(5);
        }

        p.mousePressed = function() {
            currentPath = [];
            paths.push(currentPath);
        }

        p.draw = function() {
            p.background(255);
            p.image(pg, 0, 0);

            if(p.mouseIsPressed && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
                const point = {
                    x: p.mouseX,
                    y: p.mouseY,
                    color: colorInput.value,
                    weight: weight.value
                };
                currentPath.push(point);
            }

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
    document.getElementById('clear').addEventListener('click', function() {
        paths = [];
        pg.background(255);
    });
    document.getElementById('download').addEventListener('click', function() {
        myp5.saveCanvas('myDrawing', 'jpg');
    }); 
}