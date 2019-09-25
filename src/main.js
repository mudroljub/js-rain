import Rain from './Rain.js'

const rain = new Rain()

/* LOOP */

void function update(now) {
  window.requestAnimationFrame(update)
  rain.update(now)
}()
