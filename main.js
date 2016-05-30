// vece i manje kapi
// da vece padaju brze
// inicirati mish.prosloX u init

const PROSECNA_BRZINA = 5.8;
const MIN_VISINA_KAPI = 3;
const MAX_VISINA_KAPI = 10;
const PROSECNA_VISINA = (MIN_VISINA_KAPI + MAX_VISINA_KAPI) / 2;
const UKUPNO_KAPI = 300;
const PAUZA_KAPI = 100; // milisekundi
let vetar = 0;
let Game = {};
let canvas, podloga;
let kisha = [];
let prosliTren = 0;
let mish = {
  prosloX: 0
}

/*** KLASE ***/

class Kap {

  constructor(canvas) {
    this.podloga = canvas.getContext('2d');
    this.visina = Math.random() * (MAX_VISINA_KAPI - MIN_VISINA_KAPI) + MIN_VISINA_KAPI;
    let odstupanjeVisine = this.visina - PROSECNA_VISINA;
    this.brzina = PROSECNA_BRZINA + odstupanjeVisine / 5;
    this.reset();
  }

  update() {
    this.y += this.brzina;
    this.x += vetar;
    if (this.y > window.innerHeight) this.reset();
  }

  reset() {
    let sirinaEkrana = window.innerWidth || window.outerWidth; // innerWidth vraca 0 prvi put
    this.x = Math.floor(Math.random() * (sirinaEkrana * 2) - sirinaEkrana / 2);
    this.y = -10;
  }

  crta() {
    this.podloga.fillStyle = "#00f";
    this.podloga.fillRect(this.x, this.y, 1, this.visina);
  }

  crtaPrasak() {
    console.log('prska', this.x, this.y);
    this.podloga.beginPath();
    this.podloga.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.podloga.stroke();
  }

} // Kap

/*** LISTENERS ***/

window.onload = function init() {
  canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth || window.outerWidth;
  canvas.height = window.innerHeight || window.outerHeight;
  podloga = canvas.getContext('2d');
  mainLoop();
}

document.addEventListener('mousemove', praviVetar);

/*** LOGIKA ***/

function mainLoop(ovajTren) {
  Game.loopId = window.requestAnimationFrame(mainLoop);
  update(ovajTren); // ovajTren prosledjuje requestAnimationFrame
  crtaKapi();
}

function update(ovajTren) {
  if (kisha.length < UKUPNO_KAPI) dodajKap(ovajTren);
  for (let kap of kisha) kap.update();
}

function crtaKapi() {
  podloga.clearRect(0, 0, canvas.width, canvas.height);
  for (let kap of kisha) kap.crta();
}

/*** POMOĆNE FUNKCIJE ***/

function dodajKap(ovajTren) {
  if ((ovajTren - prosliTren) > PAUZA_KAPI) {
    let novaKap = new Kap(canvas);
    kisha.push(novaKap);
    prosliTren = ovajTren;
  }
}

function praviVetar (e) {
  vetar = (e.clientX - mish.prosloX) / 10;
  mish.prosloX = e.clientX;
}
