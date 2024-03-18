var touch = true;
let edgeColorLerpPct = 1;
var filltool = false;
var start = false;

function setup() {
  amplitude = new p5.Amplitude();
  colorMode(HSL, 360, 100, 100)
  pixelDensity(1);
  let canvas = createCanvas(windowWidth, windowHeight);
  console.log(windowWidth, windowHeight)
  canvas.parent('sketch-container');
  canvas.style('z-index','-3');
  var myCanvas = $("#defaultCanvas0");
  var myCanvasContext = myCanvas[0].getContext('2d', { willReadFrequently: true });
  ColourID = BaseColours[0].id;
  Colourchange(ColourID);
  SelectBrush("Brush 1");
  saveState();
  fadeload();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function saveimg() { 
  saveState();
  console.log(document.getElementById("bgSelected").style.backgroundColor)
  if (document.getElementById("bgSelected").style.backgroundColor != ""){
  background(document.getElementById("bgSelected").style.backgroundColor)};
    if (!state || !state.length || stateIndex === 0) {
    return;
  }
    newbrush = BrushID;
    stateIndex--;
    //console.log(stateIndex)
    image(state[stateIndex], 0, 0);
      state.pop();

      noErase();
      if (BrushID == "Eraser"){
        erase();
      }

  saveCanvas(canvas, 'SynthEasel Sketch', 'png');
}

function mousePressed() {
    strokeWeight(BrushStroke);
    if (touch === true && menuCheck() === false){
    saveState();
  if (filltool === false && Brushes[brushNum].id != "Eraser"){ 
    line(mouseX, mouseY, pmouseX, pmouseY);
    
}

    if (filltool === true){
    floodFill(drawingContext, mouseX, mouseY, color(ColourID));
    }
    }
}
function mouseDragged() {
  if (touch === true && menuCheck() === false){
  if (filltool === false){
    strokeWeight(BrushStroke);
    line(mouseX, mouseY, pmouseX, pmouseY);
        if (avgAmplitude > 180 && spectralDensity > 7000 && Brushes[brushNum].id != "Eraser") {
        //console.log(spectralDensity)
        sprayPaint();
    }
  }
    }
}

function mouseReleased() {
  if (touch === true && menuCheck() === false){
  if (filltool === false){
    //saveState();
}}}

function draw() {
  if (start == false) {
    touch = false;
  }
    if (parseInt(menu.style.left,10) <= 0){
      menu.style.left = "0px"
     }
    if (parseInt(menu.style.top,10) <= 0){
      menu.style.top = "0px"
    }
    if (parseInt(menu.style.left,10) >= windowWidth-500){
      menu.style.left = windowWidth -500 +"px"
     }
    if (parseInt(menu.style.top,10) >= windowHeight-200){
      menu.style.top = windowHeight -200 +"px"
     }
  BrushCanvas();
  //strokeWeight(BrushStroke)

    if (touch === true && menuCheck() === false){
      if (BrushID == "Fill"){
        BrushCrosshair.style.visibility = "hidden";
      }
      else {
        BrushCrosshair.style.visibility = "visible";}
    cursor(CROSS)
    }
    else {
      BrushCrosshair.style.visibility = "hidden"
    }
    if (Auplaying === true) {
    audiohandling()
    }
// while(!touchMoved()) {
//crosshair();
 //}
}