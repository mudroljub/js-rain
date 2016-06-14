// da vece padaju brze

const MIN_VISINA_KAPI = 3;
const MAX_VISINA_KAPI = 10;
const PROSECNA_VISINA = (MIN_VISINA_KAPI + MAX_VISINA_KAPI) / 2;
const PROSECNA_BRZINA = 5.8;

let vetar = 0;
let prosloMishX = 0;  // inicirati mish.prosloX da ne bude 0

document.addEventListener('mousemove', praviVetar);

export class Kap {

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


function praviVetar (e) {
  vetar = (e.clientX - prosloMishX) / 10;
  prosloMishX = e.clientX;
}
