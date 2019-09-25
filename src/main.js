import {Kap} from './Kap.js'

/*** KONFIG ***/

const UKUPNO_KAPI = 300
const ZALET_KISHE = 100 // manji broj brzi zalet

let canvas, ctx
let kisha = []
let then = 0

canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth || window.outerWidth
canvas.height = window.innerHeight || window.outerHeight
ctx = canvas.getContext('2d')

void function update(now) {
  window.requestAnimationFrame(update)
  if (kisha.length < UKUPNO_KAPI) dodajKap(now)
  for (let kap of kisha) kap.update()
  drawRain()
}()

/*** POMOĆNE FUNKCIJE ***/

function drawRain() {
  ctx.fillStyle = 'rgba(93, 37, 115, 0.9)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#CDBEE8'
  ctx.strokeStyle = '#CDBEE8'
  for (let kap of kisha) kap.crta()
}

function dodajKap(now) {
  if ((now - then) > ZALET_KISHE) {
    let novaKap = new Kap(canvas)
    kisha.push(novaKap)
    then = now
  }
}
