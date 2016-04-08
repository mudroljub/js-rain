const VISINA_KAPI = 9;
const BRZINA_KISHE = 2.8;
const TRAJANJE_PRASKA = 100;
const MAX_DOMET_PRASKA = 30;
const BROJ_PRSKANJA = 3;
const BRZINA_PRSKANJA = 1.5;
const VELICINA_BARICE = 3;
const BRZINA_BARICE = 0.1;

export class Kap {

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
      this.prskanje = new Prasak(this.podloga, this.x, this.y);
      this.reset();
    }
    if (this.prskanje) {
      this.prskanje.update();
      if (this.y > TRAJANJE_PRASKA) this.prskanje.reset();
    }
  }

  reset() {
    this.x = Math.floor(Math.random() * (window.innerWidth || window.outerWidth)); // innerWidth returns 0?
    this.y = -10;
  }

  crta() {
    this.podloga.fillRect(this.x, this.y, 1, VISINA_KAPI);
    if (this.prskanje) {
      this.prskanje.crta();
    }

  }

} // Kap

class Prasak {

  constructor(podloga, x, y) {
    this.podloga = podloga;
    this.x = x;
    this.y = y;
    this.raspon = 0;
    this.ugloviPrskanja = [];
  }

  update() {
    if (!this.x || !this.y) return;
    this.y += BRZINA_BARICE;
    this.raspon += BRZINA_PRSKANJA;
  }

  reset() {
    this.x = null;
    this.y = null;
  }

  crtaBaricu() {
    if (!this.x || !this.y) return;
    this.podloga.beginPath();
    this.podloga.arc(this.x, this.y, VELICINA_BARICE, 0, 2 * Math.PI);
    this.podloga.fill();
    this.podloga.stroke();
  }

  crtaPrskanje() {
    if (!this.x || !this.y || this.raspon > MAX_DOMET_PRASKA) return;
    for (var i = 0; i < BROJ_PRSKANJA; i++) {
      let randomUgao = randomInRange(1, 2) * Math.PI;
      this.ugloviPrskanja[i] = this.ugloviPrskanja[i] || randomUgao;
      this.podloga.beginPath();
      this.podloga.arc(this.x, this.y, this.raspon, this.ugloviPrskanja[i], this.ugloviPrskanja[i] + 0.1);
      this.podloga.stroke();
    }
  }

  crta() {
    this.crtaBaricu();
    this.crtaPrskanje();
  }

} // Prasak


function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}
