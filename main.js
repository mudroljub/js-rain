import {Kap} from './klase/Kap';

/*** KONFIG ***/

const BROJ_KAPI = 200;
const UCESTALOST_KISHE = 100;  // manji broj brzi zalet
let canvas, podloga;
let kisha = [];
let prosliovajTren = 0;

/*** LOGIKA ***/

window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth || window.outerWidth;
  canvas.height = window.innerHeight || window.outerHeight;
  podloga = canvas.getContext('2d');
  mainLoop();
}

function mainLoop(ovajTren) {
  window.requestAnimationFrame(mainLoop);
  update(ovajTren); // ovajTren daje requestAnimationFrame
  crta();
} // mainLoop

function update(ovajTren) {
  if (kisha.length < BROJ_KAPI) dodajKap(ovajTren);
  for (let kap of kisha) kap.update();
} // update

function crta() {
  podloga.clearRect(0, 0, canvas.width, canvas.height);
  for (let kap of kisha) {
    kap.crta();
    kap.crtaPrskanje();
  }
}

/*** POMOĆNE FUNKCIJE ***/

function dodajKap(ovajTren) {
  if ((ovajTren - prosliovajTren) > UCESTALOST_KISHE) {
    let novaKap = new Kap(canvas);
    kisha.push(novaKap);
    prosliovajTren = ovajTren;
  }
} // dodajKap
