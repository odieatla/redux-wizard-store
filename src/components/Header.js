import React from 'react';
import { Link } from 'react-router';

const Header = () => (
	<div>
		<div className="logo">
			<Link to={'/'}>
				Logo
			</Link>
		</div>
		<div className="search_bar">Search</div>
		<div className="user">ozhang</div>
	</div>
);

export default Header;
