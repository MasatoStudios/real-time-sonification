/* eslint-disable no-unused-vars */
import {
	Flex,
	Button,
	ButtonGroup,
	ChakraProvider,
	Center,
} from '@chakra-ui/react'
import * as Tone from 'tone'
import { useState, useEffect, useRef } from 'react'
import protobuf from 'protobufjs'
import Template from './Components/Template/Template'
import './App.css'
import Card from './Components/Card/Card'
import VooClosing from './Data/VooClosing'
import {
	PlaySound,
	StopSound,
	DropAlarm,
	RiseAlarm,
	FilterChange,
} from './Audio/Noise'
import useStock from './Components/Hooks/useStock'
const { Buffer } = require('buffer/')

function formatPrice(price) {
	return `$${price.toFixed(2)}`
}

// More research https://reactronica.com/
// May include instead of Tone.js

const App = () => {
	const [playing, setPlaying] = useState(false)
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
	} = useStock('FB')

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

	useEffect(() => {
		if (playing === true) {
			PlaySound()
		} else if (playing === false) {
			StopSound()
		}
		//make am alarm if price drops above/below 1% of old price
		if (changePercentVOO.current < -1) {
			console.log('drop')
			// console.log(changePercent.current)
			DropAlarm()
		} else if (changePercentVOO.current > 1) {
			RiseAlarm()
			console.log('rise')
			// console.log(changePercent.current)
		}

		//Change the filter depending on the trend of the stock
		FilterChange(changePercentVOO.current)

		// troubleshooting for changePercent Function
		// console.log(changePercent.current)
	})

	return (
		<ChakraProvider>
			<Template>
				<div className='containerMargin'>
					<Flex className='container' flexDirection='row'>
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
							Ticker='FB'
							Price={currentFB && <>{formatPrice(currentFB.price)}</>}
							Opening={currentFB && <>{formatPrice(openPriceFB.current)}</>}
						/>
						<Card
							Name='Nvidia'
							Ticker='NVDA'
							Price={currentNVDA && <>{formatPrice(currentNVDA.price)}</>}
							Opening={currentNVDA && <>{formatPrice(openPriceNVDA.current)}</>}
						/>
						<Card
							Name='Apple'
							Ticker='AAPL'
							Price={currentAAPL && <>{formatPrice(currentAAPL.price)}</>}
							Opening={currentAAPL && <>{formatPrice(openPriceAAPL.current)}</>}
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
				{/* <VooClosing /> */}
			</Template>
		</ChakraProvider>
	)
}

export default App
