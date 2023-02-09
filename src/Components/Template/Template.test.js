import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ChakraProvider } from '@chakra-ui/react'

import Template from './Template'

afterEach(cleanup)

//test 1
test('Renders Template Component', () => {
	const TemplateElement = <Template />
	render(<Template />)
	expect(TemplateElement).toBeInTheDocument()
})
