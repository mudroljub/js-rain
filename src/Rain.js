import Raindrop from './Raindrop.js'
import {canvas, ctx} from './canvas.js'

const totalDrops = 300
const fraquency = 100 // manji broj brzi zalet

let then = 0

export default class Rain {
  constructor() {
    this.drops = []
  }

  shouldNotAdd(now) {
    return now - then < fraquency || this.drops.length > totalDrops
  }

  addDrop(now) {
    if (this.shouldNotAdd(now)) return
    this.drops.push(new Raindrop())
    then = now
  }

  render() {
    ctx.fillStyle = 'rgba(93, 37, 115, 0.9)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#CDBEE8'
    ctx.strokeStyle = '#CDBEE8'
    this.drops.forEach(drop => drop.render())
  }

  update(now) {
    this.addDrop(now)
    this.drops.forEach(drop => drop.update())
    this.render()
  }
}
