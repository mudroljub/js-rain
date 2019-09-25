import {Kap} from './Kap.js'
import {canvas, ctx} from './canvas.js'

const totalDrops = 300
const fraquency = 100 // manji broj brzi zalet

const kisha = []
let then = 0

void function update(now) {
  window.requestAnimationFrame(update)
  if (kisha.length < totalDrops) addDrop(now)
  for (const kap of kisha) kap.update()
  drawRain()
}()

/** * POMOĆNE FUNKCIJE ***/

function drawRain() {
  ctx.fillStyle = 'rgba(93, 37, 115, 0.9)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#CDBEE8'
  ctx.strokeStyle = '#CDBEE8'
  for (const kap of kisha) kap.crta()
}

function addDrop(now) {
  if (now - then > fraquency) {
    const novaKap = new Kap()
    kisha.push(novaKap)
    then = now
  }
}
