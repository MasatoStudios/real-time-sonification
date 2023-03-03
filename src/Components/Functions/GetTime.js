import{ useState } from 'react'
import './get-time.css'

export const GetTime = () => {
    let time = new Date().toLocaleTimeString()

		const updateTime = () => {
			let time = new Date().toLocaleTimeString()
			setCurrentTime(time)
		}

		setInterval(updateTime, 1000)

		const [currentTime, setCurrentTime] = useState(time)
  return (
		<>
			<h4 className='time'>{currentTime}</h4>
		</>
	)
}