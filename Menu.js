document.body.onload = initializeMenu;

const body = document.getElementsByTagName("BODY")[0];
const menu = document.getElementById('Menu');
const dots = document.getElementById('Dots');
const Brush_container = document.getElementById('brushContainer');
const Colour_container = document.getElementById('colourContainer');
const bgpicker = document.getElementById("bgPicker");
const bgoptions = document.getElementById("bgOptions");
const bgselect = document.getElementById("bgSelected")

var Menutop = document.getElementById("Menu-bot");
var Menubot = document.getElementById("Menu-bot");
var Menumid = document.getElementById("Menu-mid");
var dropdown = document.getElementById("dropdown");
var Bgdropdown = document.getElementById("BGdropdown");

var menuX = 20;
var menuWidth = 450;
var menuHeight = menu.style.height;
var menuLeft = 20;
var menuTop = 20;
var menuY = 20;
var offset = [0,0];

menu.style.width  = menuWidth + 'px'; 
menu.style.left = menuLeft + 'px';
menu.style.top = menuTop + 'px';

Menubot.addEventListener("click", function() {
    var content = Menumid;
    if (content.style.maxHeight != "0px"){
      content.style.maxHeight = "0px";
      dropdown.style.transform = "rotate(180deg)"

    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      dropdown.style.transform = "rotate(0deg)"
    } 
  });
//menu.style.height = menuHeight + 'px';

function initializeMenu() {
    //addbrushes();
    processColour();
    addcolours();
    //BrushCanvas();
    //getKey();
}
function menuMove(event) {
  document.addEventListener("mousedown", function(event) {
    menuMove(event);
    document.addEventListener("mousemove", menuMove);
});

document.addEventListener("touchstart", function(event) {
    menuMove(event);
    document.addEventListener("touchmove", menuMove);
});

// Add event listeners to stop menu movement when mouse or touch is released
document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", menuMove);
});

document.addEventListener("touchend", function() {
    document.removeEventListener("touchmove", menuMove);
});

    event.preventDefault(); // Prevent default touch behavior
    
    // Get the current touch or mouse coordinates
    let x, y;
    if (event.type === "touchmove") {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    
    // Update the menu position
    menu.style.left = (x - menuWidth + 20) + 'px';
    menu.style.top  = (y - 40 - 10) + 'px';
}

// Add event listeners for both mouse and touch events



function menuCheck() {
    if (mouseX <= parseInt(menu.style.left, 10) + menuWidth + 20&& mouseX >= parseInt(menu.style.left, 10)+10&& mouseY <= parseInt(menu.style.top, 10) + parseInt(menu.clientHeight, 10)+20&& mouseY > parseInt(menu.style.top, 10)+10) {
        //console.log(true)
        return true
    }
    //console.log(parseInt(menu.style.top, 10))
    return false
}


// /0.5em 1em 0.5em 1em
  function bgdropdown() {
    Bgdropdown.style.transform = Bgdropdown.style.transform === "rotate(0deg)" ? "rotate(180deg)" : "rotate(0deg)" ;
    bgoptions.style.padding = bgoptions.style.padding === '0.5em 1em' ? '0em 1em' : '0.5em 1em';
    bgoptions.style.maxHeight = bgoptions.style.maxHeight === '100%' ? '0%' : '100%';
    
    
      //bglinks.classList.toggle("show")
  }
