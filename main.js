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
    this.podloga.fillStyle = "#00f";
    this.podloga.strokeStyle = '#00f';
    this.brzina = brzina;
    this.reset();
  }

  update() {
    this.y += this.brzina;
    if (this.y > window.innerHeight) {
      this.pamtiPrskanje();
      this.reset();
    }
    this.azuriraPrskanje();
    if (this.y > 100) this.resetPrskanje();
  }

  pamtiPrskanje() {
    this.prskanjeX = this.x;
    this.prskanjeY = this.y;
  }

  azuriraPrskanje() {
    if (!this.prskanjeX || !this.prskanjeY) return;
    this.prskanjeY += 0.1;
  }

  reset() {
    this.x = Math.floor(Math.random() * (window.innerWidth || window.outerWidth)); // innerWidth returns 0 first time
    this.y = -10;
  }

  resetPrskanje() {
    this.prskanjeX = null;
    this.prskanjeY = null;
  }

  crta() {
    // this.podloga.fillStyle = "#00f";
    this.podloga.fillRect(this.x, this.y, 1, VISINA_KAPI);
  }

  crtaPrskanje() {
    if (!this.prskanjeX || !this.prskanjeY) return;
    this.podloga.beginPath();
    this.podloga.arc(this.prskanjeX, this.prskanjeY, 5, 0, 2 * Math.PI);
    // this.podloga.fillStyle = '#0ff';
    this.podloga.fill();
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
