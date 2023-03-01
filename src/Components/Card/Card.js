import PropTypes from 'prop-types'

const Card = ({ Name, Ticker, Price, Opening }) => {
	return (
		<div className='card'>
			<div className='cardHeader'>
				<div>
					<h1 className='ticker'>{Ticker}</h1>
				</div>
				<div>
					<h2 className='title'>{Name}</h2>
				</div>
			</div>
			<div className='cardBody'>
				<div>
					<h2 className='price'> Price: {Price} </h2>
				</div>
				<div>
					<h3 className='opening'> Opening Price: {Opening}</h3>
				</div>
			</div>
		</div>
	)
}

// eslint-disable-next-line react/no-typos
Card.PropTypes = {
	Name: PropTypes.string.isRequired,
	Ticker: PropTypes.number.isRequired,
	Price: PropTypes.number.isRequired,
	Opening: PropTypes.number.isRequired,
}

export default Card
