/* eslint-disable no-unused-vars */

// basic styling through chakra ui
import {
	Flex,
	Button,
	ButtonGroup,
	ChakraProvider,
	Center,
	DarkMode,
} from '@chakra-ui/react'

//globally import tone.js
import * as Tone from 'tone'

// import react hooks
import { useState, useEffect, useRef } from 'react'

// import protobuf to decrypt websocket data
import protobuf from 'protobufjs'

// custom made styling
import Template from './Components/Template/Template'
import Card from './Components/Card/Card'
import './App.css'

// import custom made audio functions
import {
	PlaySound,
	StopSound,
	DropAlarm,
	RiseAlarm,
	FilterChange,
} from './Audio/Noise'

import { GetTime } from './Components/Functions/GetTime'

//import custom made hooks
import useStock from './Components/Hooks/useStock'
import useAlarm from './Components/Hooks/useAlarm'

// import Buffer to handle websocket data from websocket
const { Buffer } = require('buffer/')

// function responsible for formatting price to 2 decimal places
function formatPrice(price) {
	return `$${price.toFixed(2)}`
}

// More research https://reactronica.com/
// May include instead of Tone.js

const App = () => {
	// use states for dark mode and audio
	const [darkMode, setDarkMode] = useState(false)
	const [playing, setPlaying] = useState(false)

	// creates new variable and assigns values from useStock hook
	const {
		current: currentVOO,
		changePercent: changePercentVOO,
		openPrice: openPriceVOO,
		oldPrice: oldPriceVOO,
	} = useStock('VOO')
	const {
		current: currentJEPQ,
		changePercent: changePercentJEPQ,
		openPrice: openPriceJEPQ,
		oldPrice: oldPriceJEPQ,
	} = useStock('JEPQ')
	const {
		current: currentARKK,
		changePercent: changePercentARKK,
		openPrice: openPriceARKK,
		oldPrice: olderPriceARKK,
	} = useStock('ARKK')

	const {
		current: currentFB,
		changePercent: changePercentFB,
		openPrice: openPriceFB,
		oldPrice: oldPriceFB,
	} = useStock('META')

	const {
		current: currentNVDA,
		changePercent: changePercentNVDA,
		openPrice: openPriceNVDA,
		oldPrice: oldPriceNVDA,
	} = useStock('NVDA')

	const {
		current: currentAAPL,
		changePercent: changePercentAAPL,
		openPrice: openPriceAAPL,
		oldPrice: oldPriceAAPL,
	} = useStock('AAPL')

	//parameters for useAlarm
	//changePercentage, rising note, falling note, change from starting price

	// For alarms, use the following scale
	// Amaj Dorian scale = A B C D E F# G A
	
	useAlarm(changePercentVOO.current, 'A6', 'C3', 5, 5)
	useAlarm(changePercentARKK.current, 'A5', 'E3', 5, 5)

	// useEffect to play and stop audio
	useEffect(() => {
		if (playing === true) {
			PlaySound()
		} else if (playing === false) {
			StopSound()
		}

		//Change the filter depending on the trend of the S&P 500
		FilterChange(changePercentVOO.current)

		// troubleshooting for changePercent Function
		// console.log(changePercent.current)
	})

	// useEffect checks for dark mode in local storage
	useEffect(() => {
		const jsonStorage = localStorage.getItem('site-dark-mode')
		const currentMode = JSON.parse(jsonStorage)
		if (currentMode) {
			setDarkMode(true)
		} else {
			setDarkMode(false)
		}
	}, [])

	// useEffect to set dark mode class to body
	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
		const jsonStorage = JSON.stringify(darkMode)
		localStorage.setItem('site-dark-mode', jsonStorage)
	}, [darkMode])

	return (
		<ChakraProvider>
			<Template>
				<div className='containerMargin'>
					<div className='buttonContainer'>
						<button
							className={darkMode ? 'night' : 'light'}
							onClick={() => setDarkMode(!darkMode)}
						></button>
					</div>
					<Flex className='container top' flexDirection='row'>
						<Card
							Name='Vanguard S&P 500'
							Ticker='VOO'
							Price={currentVOO && <>{formatPrice(currentVOO.price)}</>}
							Opening={openPriceVOO && <>{formatPrice(openPriceVOO.current)}</>}
						/>
						<Card
							Name='JPMorgan Nasdaq ETF'
							Ticker='JEPQ'
							Price={currentJEPQ && <>{formatPrice(currentJEPQ.price)}</>}
							Opening={
								openPriceJEPQ && <>{formatPrice(openPriceJEPQ.current)}</>
							}
						/>
						<Card
							Name='ARK Innovation ETF'
							Ticker='ARKK'
							Price={currentARKK && <>{formatPrice(currentARKK.price)}</>}
							Opening={
								openPriceARKK && <>{formatPrice(openPriceARKK.current)}</>
							}
						/>
					</Flex>
					<Flex className='container'>
						<Card
							Name='Facebook'
							Ticker='META'
							Price={currentFB && <>{formatPrice(currentFB.price)}</>}
							Opening={openPriceFB && <>{formatPrice(openPriceFB.current)}</>}
						/>
						<Card
							Name='Nvidia'
							Ticker='NVDA'
							Price={currentNVDA && <>{formatPrice(currentNVDA.price)}</>}
							Opening={
								openPriceNVDA && <>{formatPrice(openPriceNVDA.current)}</>
							}
						/>
						<Card
							Name='Apple'
							Ticker='AAPL'
							Price={currentAAPL && <>{formatPrice(currentAAPL.price)}</>}
							Opening={
								openPriceAAPL && <>{formatPrice(openPriceAAPL.current)}</>
							}
						/>
					</Flex>
				</div>
				<ButtonGroup className='container buttonCenter' gap='2'>
					<Button
						onClick={() => setPlaying(true)}
						colorScheme='teal'
						variant='outline'
					>
						Play
					</Button>
					<Button
						onClick={() => setPlaying(false)}
						colorScheme='teal'
						variant='outline'
					>
						Stop
					</Button>
				</ButtonGroup>

				<>{GetTime()}</>
			</Template>
		</ChakraProvider>
	)
}

export default App
