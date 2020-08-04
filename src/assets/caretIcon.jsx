import React from 'react'
import PropTypes from 'prop-types'

const Caret = ({ className, stroke }) => (
	<svg className={className} width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1.2857 1L6.89795 6L1.2857 11"
			stroke={stroke}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

Caret.propTypes = {
	className: PropTypes.string,
	stroke: PropTypes.string
}

Caret.defaultProps = {
	className: undefined,
	stroke: '#3e81a5'
}

export default Caret