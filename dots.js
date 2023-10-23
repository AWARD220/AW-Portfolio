let dots = [];
let dotSize;
let fadeSpeed = 7; // Adjust the fading speed
let currentColorIndex = 0;

function setup() {
    let canvas =  createCanvas(displayWidth, displayHeight/1.5);
    canvas.parent('sketch-container');
    noStroke();
    frameRate(60);
    fadeload()
}

function draw() {
  background(20);

  if (random(1) < 0.05) {
    let x = random(width);
    let y = random(height);
    let dotSize = 5; // Start with a small size
    let maxDotSize = random(20, 300); // Random maximum size
    let dotColor = alternateColor();
    
    dots.push({ x, y, dotSize, maxDotSize, dotColor});
  }

  for (let i = dots.length - 1; i >= 0; i--) {
    let dotpoint = dots[i];
    //console.log(dotpoint.dotColor)
    fill(dotpoint.dotColor[0],dotpoint.dotColor[1],dotpoint.dotColor[2],dotpoint.dotColor[3]);
    ellipse(dotpoint.x, dotpoint.y, dotpoint.dotSize);

    // Gradually decrease alpha as dot size increases
    if (dotpoint.maxDotSize/2 <= dotpoint.dotSize) {
        dotpoint.dotColor[3] -= dotpoint.maxDotSize/20;
    }

    // Increase dot size until it reaches maxDotSize
    if (dotpoint.dotSize < dotpoint.maxDotSize) {
      dotpoint.dotSize += 1;
    }

    // Remove dots when they fully fade out
    if (dotpoint.dotColor[3] <= 0) {
      dots.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function alternateColor() {
  let colors = [[128,102,227,255], [239,100,100,255]];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  return colors[currentColorIndex];
}