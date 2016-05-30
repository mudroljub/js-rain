/*** KONFIG ***/

const BRZINA_KISHE = 5.8;
const VISINA_KAPI = 9;
const BROJ_KAPI = 200;
const UCESTALOST_KISHE = 100;  // manji broj brzi zalet
let vetar = 0;
let Game = {};
let canvas, podloga;
let kisha = [];
let prosliTren = 0;
let mish = {
  prosliX: 0,
  prosliY: 0
}

/*** KLASE ***/

class Kap {

  constructor(canvas, brzina = BRZINA_KISHE) {
    this.podloga = canvas.getContext('2d');
    this.brzina = brzina;
    this.reset();
  }

  update() {
    this.y += this.brzina;
    this.x += vetar;
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

/*** LISTENERS ***/

window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth || window.outerWidth;
  canvas.height = window.innerHeight || window.outerHeight;
  podloga = canvas.getContext('2d');
  mainLoop();
}

document.addEventListener('mousemove', (e) => {
  vetar = e.clientX - mish.prosliX;
  console.log(vetar);
  mish.prosliX = e.clientX;
})

/*** LOGIKA ***/

function mainLoop(ovajTren) {
  Game.loopId = window.requestAnimationFrame(mainLoop);
  update(ovajTren); // ovajTren daje requestAnimationFrame
  crta();
}

function update(ovajTren) {
  if (kisha.length < BROJ_KAPI) dodajKap(ovajTren);
  for (let kap of kisha) kap.update();
}

function crta() {
  podloga.clearRect(0, 0, canvas.width, canvas.height);
  for (let kap of kisha) kap.crta();
}

/*** POMOĆNE FUNKCIJE ***/

function dodajKap(ovajTren) {
  if ((ovajTren - prosliTren) > UCESTALOST_KISHE) {
    let novaKap = new Kap(canvas);
    kisha.push(novaKap);
    prosliTren = ovajTren;
  }
} // dodajKap
