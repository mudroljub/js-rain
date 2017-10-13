import {Kap} from './Kap'

/*** KONFIG ***/

const UKUPNO_KAPI = 300
const ZALET_KISHE = 100 // manji broj brzi zalet

let canvas, podloga
let kisha = []
let prosliTren = 0


/*** LOGIKA ***/

window.onload = function init() {
  canvas = document.querySelector('#canvas')
  canvas.width = window.innerWidth || window.outerWidth
  canvas.height = window.innerHeight || window.outerHeight
  podloga = canvas.getContext('2d')
  mainLoop()
}

function mainLoop(ovajTren) {
  window.requestAnimationFrame(mainLoop)
  update(ovajTren) // ovajTren prosledjuje requestAnimationFrame
  crtaKapi()
}

function update(ovajTren) {
  if (kisha.length < UKUPNO_KAPI) dodajKap(ovajTren)
  for (let kap of kisha) kap.update()
}


/*** POMOĆNE FUNKCIJE ***/

function crtaKapi() {
  podloga.fillStyle = 'rgba(93, 37, 115, 0.9)'
  podloga.fillRect(0, 0, canvas.width, canvas.height)
  podloga.fillStyle = '#CDBEE8'
  podloga.strokeStyle = '#CDBEE8'
  for (let kap of kisha) kap.crta()
}

function dodajKap(ovajTren) {
  if ((ovajTren - prosliTren) > ZALET_KISHE) {
    let novaKap = new Kap(canvas)
    kisha.push(novaKap)
    prosliTren = ovajTren
  }
}
