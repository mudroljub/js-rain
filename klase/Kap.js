const VISINA_KAPI = 9;
const BRZINA_KISHE = 2.8;

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
			if (this.y > 100) this.prskanje.reset();
		}
  }

  reset() {
    this.x = Math.floor(Math.random() * (window.innerWidth || window.outerWidth)); // innerWidth returns 0 first time
    this.y = -10;
  }

  crta() {
    // this.podloga.fillStyle = "#00f";
    this.podloga.fillRect(this.x, this.y, 1, VISINA_KAPI);
		if(this.prskanje) {
			this.prskanje.crta();
		}

  }

} // Kap

class Prasak {

	constructor(podloga, x, y) {
		this.podloga = podloga;
		this.x = x;
		this.y = y;
	}

	update() {
		if (!this.x || !this.y) return;
		this.y += 0.1;
	}

	reset() {
		this.x = null;
		this.y = null;
	}

	crtaBaricu() {
		if (!this.x || !this.y) return;
		this.podloga.beginPath();
		this.podloga.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		// this.podloga.fillStyle = '#0ff';
		this.podloga.fill();
		this.podloga.stroke();
	}

	crtaPrskanje() {
		if (!this.x || !this.y) return;
		this.podloga.fillRect(this.x, this.y - 10, 1, 1 );
	}

	crta() {
		this.crtaBaricu();
		this.crtaPrskanje();
	}

}
