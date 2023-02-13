import {
	Flex,
	Button,
	ButtonGroup,
	ChakraProvider,
	Center,
} from '@chakra-ui/react'

import * as Tone from 'tone'
import { useState, useEffect } from 'react'
import protobuf from 'protobufjs'
import Template from './Components/Template/Template'
import './App.css'
import Card from './Components/Card/Card'
import VooClosing from './Data/VooClosing'
import { PlaySound, StopSound } from './Audio/Noise'
const { Buffer } = require('buffer/');

function formatPrice(price){
	return `$${price.toFixed(2)}`
}


// More research https://reactronica.com/
// May include instead of Tone.js

const App = () => {
	const [playing, setPlaying] = useState(false)
	const [current, setCurrent] = useState(null)

	useEffect(() =>{
		const ws = new WebSocket('wss://streamer.finance.yahoo.com');

		protobuf.load('./YPricingData.proto', (error, root) => {
			if(error){
				return console.log(error)
			}
			const Yaticker = root.lookupType('yaticker')

			ws.onopen = function open() {
  				console.log('connected');
  				ws.send(JSON.stringify({
    			subscribe: ['VOO']
  				}));
			};

			ws.onclose = function close() {
				console.log('disconnected');
			};

			ws.onmessage = function incoming(message) {
				const next = (Yaticker.decode(new Buffer(message.data, 'base64')))
				setCurrent(next)
				};
			})

	},[])

	useEffect(() => {
		if (playing === true) {
			PlaySound()
		} else if (playing === false) {
			StopSound()
		}
	})

	return (
		<ChakraProvider>
			<Template>
				<div className='containerMargin'>
					<Flex className='container' flexDirection='row'>
						<Card
							Name='Vanguard S&P 500'
							Ticker='VOO'
							Price={current && <>{formatPrice(current.price)}</>}
							Opening='3900.97'
						/>
						<Card
							Name='S&P 500'
							Ticker='SPX'
							Price='4000.85'
							Opening='3900.97'
						/>
						<Card
							Name='S&P 500'
							Ticker='SPX'
							Price='4000.85'
							Opening='3900.97'
						/>
					</Flex>
					<Flex className='container'>
						<Card
							Name='S&P 500'
							Ticker='SPX'
							Price='4000.85'
							Opening='3900.97'
						/>
						<Card
							Name='S&P 500'
							Ticker='SPX'
							Price='4000.85'
							Opening='3900.97'
						/>
						<Card
							Name='S&P 500'
							Ticker='SPX'
							Price='4000.85'
							Opening='3900.97'
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
