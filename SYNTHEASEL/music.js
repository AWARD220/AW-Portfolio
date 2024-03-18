const songbar = document.getElementById('SongBar');
var songbarprog = document.getElementById('SongBarProg');
var playButton = document.getElementById('playButton');
var songchoice = Songs[SongNumber].audiopath;
var progress = songbar.style.width;
var maxwidth = songbar.offsetWidth;
var newlength;
var Auplaying = false;
var length;
var progress;
var fft = new p5.FFT();

var low;
var mid; 
var high; 
var spectrum;
var level;
var avgAmplitude;
var sumOfSquares;
var normalizedSum;
var spectralDensity;

function preload(){
  sound = loadSound(songchoice);
}
    
function Soundstroke() {
    spectrum = fft.analyze();
    //console.log(fft.linAverages(3))
    low = fft.getEnergy(20, 60);
    mid = fft.getEnergy(200, 450);
    high = fft.getEnergy(500, 4000);
    //console.log(low, mid, high);
    Brushes[0].BrushStroke = 1 + (pow(high, 3))/200000;
    Brushes[1].BrushStroke = 1 + (pow(mid, 4))/40000000;
    Brushes[2].BrushStroke = 1 + (pow(low, 2))/600;

}

function BusyStroke() {
    level = amplitude.getLevel();
    avgAmplitude = level * 1000;
    sumOfSquares = spectrum.reduce((acc, value) => acc + value ** 2, 0);
    // Normalize the sum
    normalizedSum = sumOfSquares / spectrum.length;
    spectralDensity = normalizedSum;

}

function startDraw(){
    start = true;
    touch = true;
    document.getElementById("startSong").remove()
    playSong();
}

function playSong() {
    length = sound.duration();
    progress = maxwidth / length;
    if (Auplaying != true){
    sound.play();
    Auplaying = true; 
    playButton.src="img/Pause.svg";
    }
    else {
        Auplaying = false;
        sound.pause();
        playButton.src="img/play.svg";
    }
    //console.log(Auplaying);

}

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    playSong()
  }
}

function audiohandling() {
    newlength = progress * sound.currentTime();
    songbarprog.style.width = newlength + "px";
    //console.log(songbarprog.style.width)
    if (newlength + "px" == songbarprog.style.width && songbarprog.style.width != "0px"){
        sound.stop();
        Auplaying = false;
    }
    BrushStroke = Brushes[brushNum].BrushStroke;
    Soundstroke();
    BusyStroke();   
}


