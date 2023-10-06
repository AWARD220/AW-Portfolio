var ColourID = [];
var ColourKey = Songs[SongNumber].key;
var targetNote
var varience
var note_num;

var BaseColours = [
 {  
    id: [0,0,0]},{
    id: [0,0,100]},{
    note: "C",
    id: [5,50,50]},{
    note: "Db",
    id: [45,50,50]},{
    note: "D",
    id: [75,50,50]},{
    note: "Eb",
    id: [105,50,50]},{
    note: "E",
    id: [135,50,50]},{
    note: "F",
    id: [165,50,50]},{
    note: "Gb",
     id: [195,50,50]},{
    note: "G",
    id: [225,50,50]},{
    note: "Ab",
    id: [255,50,50]},{
    note: "A",
    id: [285,50,50]},{
    note: "Bb",
    id: [315,50,50]},{
    note: "B",
    id: [345,50,50]},
]
function processColour() {
    for (let i = 2; i < ColourKey.length; i++) {
        if (ColourKey[0].base_note == ColourKey[i].note) {
            targetNote = ColourKey[i].correspondence;
            note_num = i;
        }
    };
    //console.log(targetNote);
    for (let i = 2; i < BaseColours.length; i++) {
        varience = (targetNote - ColourKey[i].correspondence) * BaseColours[i].id[0];
        
        if (BaseColours[i].id[0] != BaseColours[note_num].id[0]) {
            if (BaseColours[note_num].id[0] >= BaseColours[i].id[0]){
                BaseColours[i].id[0] = BaseColours[i].id[0] + varience/6;}
            else {
                BaseColours[i].id[0] = BaseColours[i].id[0] - varience/6;
            }
            if (BaseColours[i].id[0] > 360) {
                BaseColours[i].id[0] = BaseColours[i].id[0]-360;
            }
            
        }
        varience = (targetNote - ColourKey[i].correspondence) * BaseColours[i].id[1];
        if (ColourKey[1].key == "major"){
            BaseColours[i].id[1] = BaseColours[i].id[1] + varience/2;
        }
        else {
            BaseColours[i].id[1] = BaseColours[i].id[1] - varience/2;
            BaseColours[i].id[2] = BaseColours[i].id[2] - varience/10;
        }
    }
        for (let i = 10; i <= 20; i = i + 10) {
        new_colour = {id: [BaseColours[note_num].id[0], BaseColours[note_num].id[1], BaseColours[note_num].id[2]-i]};
        //console.log(new_colour);
        BaseColours.push(new_colour);
        //console.log(BaseColours)
    }
}

function addcolours() {
    BaseColours.forEach((result) => {
    const link = document.createElement("div");
    const card = document.createElement("div"); 
    card.classList = 'Colour';
    link.classList = 'Colour bglink';
      const cardContent = `
    <div id="${result.id}"class="colourcard" onclick="Colourchange([${result.id}])" style="background-color:hsl(${result.id[0]}deg,${result.id[1]}%,${result.id[2]}%)">
    </div>`
      const linkContent = `
    <div id="${result.id}"class="cardLink" onclick="BGColourchange('${result.id[0]}deg,${result.id[1]}%,${result.id[2]}%')" style="background-color:hsl(${result.id[0]}deg,${result.id[1]}%,${result.id[2]}%)">
    </div>`

    Colour_container.innerHTML +=cardContent;
    bgoptions.innerHTML +=linkContent;
    //console.log("loaded ", result.id);
    //console.log("loaded ", cardContent);
    })
}

  function Colourchange(value) {
  ColourID = value;
  StringColourID = ColourID.toString();
  //console.log(ColourID)
  stroke(ColourID);
  activeColourcards = document.getElementsByClassName("colourcard active")
  for (let i = 0; i< activeColourcards.length; i++) {
      //console.log(activeColourcards[i])
      activeColourcards[i].classList.toggle("active");
  }
  colourcard = document.getElementById(StringColourID);
  colourcard.classList.toggle("active");
  }

  function BGColourchange(value) {
    body.style.backgroundColor = "hsl("+value+")";
    bgselect.style.backgroundColor = "hsl("+value+")";
    bgdropdown()



  }