import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
const Card = require('./Card')

afterEach(cleanup)

// Test 1
test('Renders Card Component', () => {
	const CardElement = <Card />
	render(<Card />)
	expect(Card).toBeInTheDocument()
	expect(Card).toHaveClass('card')
})

// describe("Card Component", () => {

//     // Test 1
//     test('Renders Card Component', () => {
//         const CardElement = <Card />
//         // render(<Card />)
//         expect(Card).toBeInTheDocument()
//         expect(Card).toHaveClass('card')
//     })
// })
