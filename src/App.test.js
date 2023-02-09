// import testing library
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import App component
import App from './App'

// test 1
test('Renders App Component', () => {
	const AppElement = <App />
	render(<App />)
	expect(AppElement).toBeInTheDocument()
})
