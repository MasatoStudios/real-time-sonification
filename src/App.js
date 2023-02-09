import {
	Flex,
	Button,
	ButtonGroup,
	ChakraProvider,
	Center,
} from '@chakra-ui/react'
import * as Tone from 'tone'
import { useState, useEffect } from 'react'

import Template from './Components/Template/Template'
import './App.css'
import Card from './Components/Card/Card'
import VooClosing from './Data/VooClosing'
import { PlaySound, StopSound } from './Audio/Noise'

// More research https://reactronica.com/
// May include instead of Tone.js

const App = () => {
	const [playing, setPlaying] = useState(false)

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
							Price='1234'
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
