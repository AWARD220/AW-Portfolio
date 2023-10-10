var Brush1preview = document.getElementById("Brush1Preview");
var Brush2preview = document.getElementById("Brush2Preview");
var Brush3preview = document.getElementById("Brush3Preview");
var Brush1spray = document.getElementById("Brush1spray");
var Brush2spray = document.getElementById("Brush2spray");
var Brush3spray = document.getElementById("Brush3spray");
var BrushCrosshair = document.getElementById("BrushCrosshair");
let circles;

function BrushCanvas() {
  Brushes.forEach(result => {
    if (document.getElementById(result.Preview) != null) {
    document.getElementById(result.Preview).style.width = result.BrushStroke.toString() + "px";
    document.getElementById(result.Preview).style.height = result.BrushStroke.toString() + "px";

    document.getElementById(result.Spray).style.width = (result.BrushStroke*1.4).toString() + "px";
    document.getElementById(result.Spray).style.height = (result.BrushStroke * 1.4).toString() + "px";
    if (avgAmplitude > 170 && spectralDensity > 6000) {
        document.getElementById(result.Spray).style.opacity = "100%"
    }
    else {
        document.getElementById(result.Spray).style.opacity = "0%"
    }
    const svgDoc = document.getElementById(result.Spray).contentDocument;
    const circles = svgDoc.querySelectorAll('circle');
    //console.log(circles);
    for (let i = 0; i< circles.length; i++) {
      circles[i].setAttribute('fill', "hsl("+ColourID[0]+"deg, "+ColourID[1]+"%, "+ColourID[2]+"% )");
    }
    document.getElementById(result.Preview).style.backgroundColor = "hsl("+ColourID[0]+"deg, "+ColourID[1]+"%, "+ColourID[2]+"% )";

    

   
    }
  });
  BrushCrosshair.style.width = BrushStroke + "px"; 
  BrushCrosshair.style.height = BrushStroke + "px"; 
  BrushCrosshair.style.top = (mouseY- BrushStroke/2)+ "px" ;
  BrushCrosshair.style.left = (mouseX- BrushStroke/2) + "px";
  }

/*
    Brushes.forEach((result) => {
    let BrushCanvas = createCanvas(displayWidth, windowHeight) 
    background(51);
    console.log(result.id)
    BrushCanvas.parent('Brush 1');

    const content = `
      <canvas id="${result.id}-canvas">
      </canvas>`
    
    BrushCanvas.innerHTML +=content;
    console.log("canvas loaded ", result.id);
    })
} */