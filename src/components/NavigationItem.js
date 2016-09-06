import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const NavigationItem = ({ text, href }) => (
	<li className="comGlobalHeader__navItem">
		<Link to={href} className="comGlobalHeader__navItemLink">{text}</Link>
	</li>
)

NavigationItem.propTypes = {
	text: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
}

export default NavigationItem;
