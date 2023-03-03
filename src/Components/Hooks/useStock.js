import { useEffect, useRef, useState } from 'react'
import protobuf from 'protobufjs'
import { Buffer } from 'buffer/'


const useStock = (stock) => {
	const [current, setCurrent] = useState(null)
	const oldPrice = useRef(0)
	const changePercent = useRef(0)
	const openPrice = useRef(0)
	let first = 0

	useEffect(() => {
		// defines websocket to connect to
		const ws = new WebSocket('wss://streamer.finance.yahoo.com')
		//loads protobuf file
		protobuf.load('./YPricingData.proto', (error, root) => {
			//if error, console log error
			if (error) {
				return console.log(error)
			}
			//defines the type of data to be received
			const Yaticker = root.lookupType('yaticker')
			//defines what to do when websocket is opened
			ws.onopen = function open() {
				// console.log('connected')
				ws.send(
					JSON.stringify({
						subscribe: [stock],
					})
				)
			}
			//defines what to do when websocket is closed
			ws.onclose = function close() {
				// console.log('disconnected')
			}
			//defines what to do when websocket receives data
			ws.onmessage = function incoming(message) {
				//decodes the data
				const next = Yaticker.decode(new Buffer(message.data, 'base64'))
				//sets the current state to the decoded data
				setCurrent(next)
				
				// console.log(next);
				changePercent.current = next.changePercent
				oldPrice.current = next.price

				if (first === 0) {
					openPrice.current = next.price
					first++
				}

				// troubleshooting commands for websocket data
				// console.log(next)
				// console.log(next.price)
				// console.log(changePercent.current)
				// console.log(openPrice.current)
				// console.log(oldPrice.current)
			}
		})
	},[current])
	return{current, changePercent, openPrice, oldPrice}
}

export default useStock