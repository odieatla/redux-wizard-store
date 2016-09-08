import React from 'react';
import { Link } from 'react-router';

const HeaderLogo = () => (
	<Link to={'/'} className="comGlobalHeader__logo logo-edgemax">
		<span className="icon ubnt-icon--edgemax" />
	</Link>
)

export default HeaderLogo
