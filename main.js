// vece i manje kapi
// da vece padaju brze
// inicirati mish.prosloX u init

import {Kap} from './klase/KapStaro';

/*** KONFIG ***/

const UKUPNO_KAPI = 300;
const PAUZA_KAPI = 100; // manji broj brzi zalet

let canvas, podloga;
let kisha = [];
let prosliTren = 0;


/*** LISTENERS ***/

window.onload = function init() {
  canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth || window.outerWidth;
  canvas.height = window.innerHeight || window.outerHeight;
  podloga = canvas.getContext('2d');
  mainLoop();
}


/*** LOGIKA ***/

function mainLoop(ovajTren) {
  window.requestAnimationFrame(mainLoop);
  update(ovajTren); // ovajTren prosledjuje requestAnimationFrame
  crtaKapi();
}

function update(ovajTren) {
  if (kisha.length < UKUPNO_KAPI) dodajKap(ovajTren);
  for (let kap of kisha) kap.update();
}

function crtaKapi() {
  podloga.clearRect(0, 0, canvas.width, canvas.height);
  for (let kap of kisha) {
    kap.crta();
  }
}

/*** POMOĆNE FUNKCIJE ***/

function dodajKap(ovajTren) {
  if ((ovajTren - prosliTren) > PAUZA_KAPI) {
    let novaKap = new Kap(canvas);
    kisha.push(novaKap);
    prosliTren = ovajTren;
  }
}
