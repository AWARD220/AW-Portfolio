// for sleep https://www.sitepoint.com/delay-sleep-pause-wait/aa
let loadbg = document.getElementById("load");
let loadbg2 = document.getElementById("load2");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fadeload() {
  loadbg.style.right = "-" + innerWidth / 2 + "px";
  loadbg2.style.left = "-" + innerWidth / 2 + "px";
  sleep(500).then(() => {
    loadbg.style.opacity = "0%"
    loadbg2.style.opacity = "0%"
    document.getElementById("load2T").style.opacity = "0%"
    document.getElementById("loadT").style.opacity = "0%"

  })
}

function fadeappear(link) {
  loadbg.style.opacity = "100%"
  loadbg2.style.opacity = "100%"
  loadbg.style.right = "0px";
  loadbg2.style.left = "0px";
  sleep(500).then(() => {window.location.href = link;});

}

