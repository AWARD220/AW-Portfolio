let previousState;
let stateIndex = 0;
let state = [];
var newbrush;

function undoToPreviousState() {
  
  if (!state || !state.length || stateIndex === 0) {
    return;
  }
  newbrush = BrushID;
  stateIndex--;
  //console.log(stateIndex)
  clear();
  image(state[stateIndex], 0, 0);
    state.pop();

    noErase();
    if (BrushID == "Eraser"){
      erase();
    }

  }  
function saveState() {
  //console.log("state saved")
  stateIndex++;
  loadPixels();
  console.log("saved")
  state.push(get())
}
