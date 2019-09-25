import {Prasak} from './Prasak.js'

const MIN_VISINA_KAPI = 3
const MAX_VISINA_KAPI = 10
const PROSECNA_VISINA = (MIN_VISINA_KAPI + MAX_VISINA_KAPI) / 2
const PROSECNA_BRZINA = 5.8

let vetar = 0
let prosloMishX = 0  // inicirati mish.prosloX da ne bude 0

document.addEventListener('mousemove', praviVetar)

export class Kap {

  constructor(canvas) {
    this.podloga = canvas.getContext('2d')
    this.visina = Math.random() * (MAX_VISINA_KAPI - MIN_VISINA_KAPI) + MIN_VISINA_KAPI
    let odstupanjeVisine = this.visina - PROSECNA_VISINA
    this.brzina = PROSECNA_BRZINA + odstupanjeVisine / 5
    this.reset()
  }

  update() {
    this.y += this.brzina
    this.x += vetar
    if (this.y > window.innerHeight) {
      this.prskanje = new Prasak(this.podloga, this.x, this.y)
      this.reset()
    }
    if (this.prskanje) {
      this.prskanje.update()
    }
  }

  reset() {
    let sirinaEkrana = window.innerWidth || window.outerWidth // innerWidth vraca 0 prvi put
    this.x = Math.floor(Math.random() * (sirinaEkrana * 2) - sirinaEkrana / 2)
    this.y = -10
  }

  crta() {
    this.podloga.fillRect(this.x, this.y, 1, this.visina)
    if (this.prskanje) this.prskanje.crta()
  }

}


function praviVetar (e) {
  vetar = (e.clientX - prosloMishX) / 10
  prosloMishX = e.clientX
}
