/*** KONFIG ***/

const BRZINA_KISHE = 2.8;
const VISINA_KAPI = 9;
const BROJ_KAPI = 200;
const UCESTALOST_KISHE = 100;  // manji broj brzi zalet
let Game = {};
let canvas, podloga;
let kisha = [];
let prosliovajTren = 0;

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

  crtaPrasak() {
    console.log('prska', this.x, this.y);
    this.podloga.beginPath();
    this.podloga.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.podloga.stroke();
  }

} // Kap

/*** LOGIKA ***/

window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth || window.outerWidth;
  canvas.height = window.innerHeight || window.outerHeight;
  podloga = canvas.getContext('2d');
  mainLoop();
}

function mainLoop(ovajTren) {
  Game.loopId = window.requestAnimationFrame(mainLoop);
  update(ovajTren); // ovajTren daje requestAnimationFrame
  crta();
} // mainLoop

function update(ovajTren) {
  if (kisha.length < BROJ_KAPI) dodajKap(ovajTren);
  for (let kap of kisha) kap.update();
} // update

function crta() {
  podloga.clearRect(0, 0, canvas.width, canvas.height);
  for (let kap of kisha) kap.crta();
}

/*** POMOĆNE FUNKCIJE ***/

function dodajKap(ovajTren) {
  if ((ovajTren - prosliovajTren) > UCESTALOST_KISHE) {
    let novaKap = new Kap(canvas);
    kisha.push(novaKap);
    prosliovajTren = ovajTren;
  }
} // dodajKap
