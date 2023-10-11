let songSelectCont = document.getElementById("SongSelect");
let sounds = Array(Songs.length);
let currentlyPlaying = -1; // Initially, no song is playing
let Auplaying = false;

function preload() {
  Songs.forEach((result, i) => {
    sounds[i] = loadSound(result.audiopath);
  });
}

function addSongs() {
  Songs.forEach((result, i) => {
    const songCard = document.createElement("div");
    songCard.classList = 'songCard';
    const songCardContent = `
      <div id="${result.name}" class="songCard">
        <div class="songCardLink" id="songCardLink${i}" onclick="fadeappear('draw.html#${result.name}')">
        <h3>${result.artist}</h3>
        <p>${result.name}</p></div>
        <div class="cardControls">
        <img src="img/play.svg" class="icon unselectable PB" id="playButton${i}" alt="Play" draggable="false" onclick="playCardSong(${i})">
        </div>
        </div>`;
    songSelectCont.innerHTML += songCardContent;
  });
}

function playCardSong(path) {
  const playButton = document.getElementById(`playButton${path}`);
  
  // Remove PBactive class from all song cards
  const songCards = document.getElementsByClassName('songCard');
  for (let i = 0; i < songCards.length; i++) {
    songCards[i].classList.remove('PBactive');
  }
  
  if (currentlyPlaying !== -1) {
    // Stop the currently playing song if there is one
    sounds[currentlyPlaying].stop();
    document.getElementById(`playButton${currentlyPlaying}`).src = "img/play.svg";
  }

  if (currentlyPlaying !== path) {
    // Start the new song
    sounds[path].loop();
    currentlyPlaying = path;
    playButton.src = "img/Pause.svg";
    Auplaying = true;
    
    // Add PBactive class to the currently playing song card
    songCards[path].classList.add('PBactive');
  } else {
    // Toggle pause/play for the same song
    if (Auplaying) {
      sounds[path].stop();
      Auplaying = false;
      playButton.src = "img/play.svg";

      
    } else {
      sounds[path].play();
      Auplaying = true;
      playButton.src = "img/Pause.svg";
    }
  }
}

document.body.onload = addSongs;
