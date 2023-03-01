import * as Tone from 'tone'

const noise = new Tone.Noise('brown')
// lower the volume to -40db
noise.volume.value = -35
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

export function DropAlarm() {
	//play a sound when price drops
	const lowAlarm = new Tone.Synth().toDestination()
	const now = Tone.now()

	lowAlarm.triggerAttack('A3', now)
	lowAlarm.triggerRelease(now + 0.5)
}

export function RiseAlarm() {
	//play a sound when price rises
	const highAlarm = new Tone.Synth().toDestination()
	const now = Tone.now()

	highAlarm.triggerAttackRelease('A6', now)
	highAlarm.triggerRelease(now + 0.5)
}

export function FilterChange(ref) {
	if (ref < 0) {
		noiseFilter.frequency.value -= 10
		// console.log('adding to filter')
		// console.log(noiseFilter.frequency.value);
		if (noiseFilter.frequency.value < 50) {
			noiseFilter.frequency.value = 1000
			return 0
		}
	} else if (ref > 0) {
		noiseFilter.frequency.value += 10
		// console.log('decreasing filter')
		// console.log(noiseFilter.frequency.value);
		if (noiseFilter.frequency.value >= 3500) {
			noiseFilter.frequency.value = 1000
			return 0
		}
	}
}
