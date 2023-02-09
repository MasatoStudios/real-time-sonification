import * as Tone from 'tone'

const noise = new Tone.Noise('brown')
// lower the volume to -40db
noise.volume.value = -40
const noiseFilter = new Tone.Filter(1000, 'lowpass').connect(Tone.Master)
noise.connect(noiseFilter)

export function PlaySound() {
	Tone.Master.mute = false
	noise.start()
	console.log('Playing audio now')
}

export function StopSound() {
	Tone.Master.mute = true
	console.log('Stopping audio now')
}
