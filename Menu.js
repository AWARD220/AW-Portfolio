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

function menuMove() {
    timer=setInterval(function(){   
    //console.log(menu.style.left)
    touch = false;
    menu.style.left = (mouseX - menuWidth + 20) + 'px';
    menu.style.top  = (mouseY-40 -10) + 'px';     
     }, 10); // the above code is executed every 10 ms
    document.addEventListener("mouseup", function(){
    if (timer) clearInterval(timer)     
    touch = true;
    });
}

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
