var BrushStroke;
var BrushID = "Brush1";
var brushNum

var Brushes = [
    {
    id: "Brush 1",
    BrushStroke: 5,
    Preview: "Brush1Preview",
    Spray: "Brush1spray"

},{
    id: "Brush 2",
    BrushStroke: 15,
    Preview: "Brush2Preview",
    Spray: "Brush2spray"
},{
    id: "Brush 3",
    BrushStroke: 50,
    Preview: "Brush3Preview",
    Spray: "Brush3spray"

},{
    id: "Eraser",
    BrushStroke: 25,
    Preview: "Brush4Preview"

},{
    id: "Fill",
    BrushStroke: 25,
    Preview: "Brush5Preview"
    }]

function SelectBrush(value) {
    noErase()
    BrushID = value;
    Brushes.forEach((result, i) => {
        if (BrushID == result.id){
            brushNum = i; 
            BrushStroke = result.BrushStroke;
            if(result.id == "Eraser"){
                erase()
            }
            //strokeWeight(BrushStroke);
        }
    });
  activeBrushcards = document.getElementsByClassName("card active")
  for (let i = 0; i< activeBrushcards.length; i++) {
      activeBrushcards[i].classList.toggle("active");
  }
  brushcard = document.getElementById(value);
  brushcard.classList.toggle("active");
  filltool=false  
  if (BrushID == 'Fill'){
    filltool=true
  }
}

function sprayPaint() {
  const minRadius = BrushStroke/5 * (spectralDensity-7000)/1000;
  const sprayDensity = BrushStroke;
  const r = minRadius;
  const rSquared = r * r;
  const lerps = 4;
  for (let i = 0; i < lerps; i++) {
    const lerpX = lerp(mouseX, pmouseX, i / lerps);
    const lerpY = lerp(mouseY, pmouseY, i / lerps);
    // draw a bunch of random points within a circle
    for (let j = 0; j < sprayDensity; j++) {

      const randX = randomGaussian(0, r / 4); // 
      const randY = randomGaussian(0, r / 4); // 
      const randB = random(BrushStroke/40, BrushStroke/10)
      strokeWeight(randB)

      // Ensure the generated point is within the circular area
      if (randX * randX + randY * randY <= rSquared) {
        // draw the random point
        point(lerpX + randX, lerpY + randY);
      }
    }
  }
}

function sinWave() {


}