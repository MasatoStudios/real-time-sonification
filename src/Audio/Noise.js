import * as Tone from 'tone'

//TODO:
// NOTE TO SELF
// For alarms, use the following scale
// Amaj Dorian scale = A B C D E F# G A





//basic noise creation
const noise = new Tone.Noise('brown')
// lower the volume to -40db
noise.volume.value = -35
const noiseFilter = new Tone.Filter(1000, 'lowpass').connect(Tone.Master)
noise.connect(noiseFilter)

//function to play noise
export function PlaySound() {
	Tone.Master.mute = false
	noise.start()
	// console.log('Playing audio now')
}

//function to stop noise
export function StopSound() {
	Tone.Master.mute = true
	// console.log('Stopping audio now')
}

//function to play a sound when price drops below percentage
export function DropAlarm(falling) {
	//play a sound when price drops
	const lowAlarm = new Tone.Synth().toDestination()
	const now = Tone.now()

	//sets volume to -10db and plays a note for 0.5 seconds
	lowAlarm.volume.value = -10
	lowAlarm.triggerAttack(falling, now)
	lowAlarm.triggerRelease(now + 0.5)
}

//function to play a sound when price rises above percentage
export function RiseAlarm(rising) {
	//play a sound when price rises
	const highAlarm = new Tone.Synth().toDestination()
	const now = Tone.now()

	//sets volume to -10db and plays a note for 0.5 seconds
	highAlarm.volume.value = -10
	highAlarm.triggerAttackRelease(rising, now)
	highAlarm.triggerRelease(now + 0.5)
}

//function to change the filter of the noise depending on the trend of the S&P 500
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
