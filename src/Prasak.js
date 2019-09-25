const BROJ_PRSKANJA = 3
const BRZINA_PRSKANJA = 1.5
const MAX_DOMET_PRSKANJA = 30
const VELICINA_BARICE = 3
const BRZINA_BARICE = 0.1

export class Prasak {

  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.raspon = 0
    this.ugloviPrskanja = []
  }

  update() {
    if (!this.x || !this.y) return
    this.y += BRZINA_BARICE
    this.raspon += BRZINA_PRSKANJA
  }

  reset() {
    this.x = null
    this.y = null
  }

  crtaBaricu() {
    if (!this.x || !this.y) return
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, VELICINA_BARICE, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.stroke()
  }

  crtaPrskanje() {
    if (!this.x || !this.y || this.raspon > MAX_DOMET_PRSKANJA) return
    for (var i = 0; i < BROJ_PRSKANJA; i++) {
      let randomUgao = randomInRange(1, 2) * Math.PI
      this.ugloviPrskanja[i] = this.ugloviPrskanja[i] || randomUgao
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.raspon, this.ugloviPrskanja[i], this.ugloviPrskanja[i] + 0.1)
      this.ctx.stroke()
    }
  }

  crta() {
    // this.crtaBaricu()
    this.crtaPrskanje()
  }
}


function randomInRange(min, max) {
    return Math.random() * (max - min) + min
}
