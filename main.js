/*** KONFIG ***/

const BRZINA_KISHE = 2.8;
const VISINA_KAPI = 9;
const BROJ_KAPI = 200;
const ZALET_KISHE = 100;  // manji broj brzi zalet
let Game = {};
let canvas, podloga;
let kisha = [];
let trenutnoKapi = 10;
let prosliTren = 0;

/*** KLASE ***/

class Kap {

  constructor(canvas, brzina = BRZINA_KISHE) {
    this.podloga = canvas.getContext('2d');
    this.brzina = brzina;
    this.reset();
  }

  update() {
    this.y += this.brzina;
    if (this.y > window.innerHeight) this.reset();
  }

  reset() {
    this.x = Math.floor(Math.random() * (window.innerWidth || window.outerWidth)); // innerWidth returns 0 first time
    this.y = -10;
  }

  crta() {
    this.podloga.fillStyle = "#00f";
    this.podloga.fillRect(this.x, this.y, 1, VISINA_KAPI);
  }

} // Kap

/*** LOGIKA ***/

window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth || window.outerWidth;
  canvas.height = window.innerHeight || window.outerHeight;
  podloga = canvas.getContext('2d');
  for (let i = 0; i < BROJ_KAPI; i++) {
    kisha[i] = new Kap(canvas);
  }
  mainLoop();
}

function mainLoop(tren) {
  Game.loopId = window.requestAnimationFrame(mainLoop);
  update(tren); // tren daje requestAnimationFrame
  crta();
} // mainLoop

function update(tren) {
  if (trenutnoKapi < kisha.length) dodajKap(tren);
  for (let i = 0; i < trenutnoKapi; i++) {
    kisha[i].update();
  }
} // update

function crta() {
  podloga.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < kisha.length; i++) {
    kisha[i].crta();
  }
}

/*** POMOĆNE FUNKCIJE ***/

function dodajKap(tren) {
  if ((tren - prosliTren) > ZALET_KISHE) {
    trenutnoKapi++;
    prosliTren = tren
  }
} // dodajKap
