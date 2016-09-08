import React, { PropTypes } from 'react';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';
import SearchForm from './SearchForm';

const HeaderContentMobile = (
	{ navs = [], isMobileNavExpanded = false }
 ) => {
	let headerClass = 'comGlobalHeader__mobileContent';
	if (isMobileNavExpanded) {
		headerClass = `${headerClass} is-mobile-nav-expanded`;
	}

	return (
		<div className={headerClass}>
			<NavigationList>
				<li className="comGlobalHeader__navItem comGlobalHeader__navItemSearchForm">
					<span className="icon ubnt-icon--magnifying-glass comGlobalHeader__navItemIcon"></span>
					<SearchForm isMobile={true} />
				</li>
			</NavigationList>
			<NavigationList>
				{ navs.map(nav => (
					<NavigationItem key={nav.text} {...nav} />
				))}
			</NavigationList>
		</div>
	)
}

HeaderContentMobile.propTypes = {
	navs: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired
	})),
	isMobileNavExpanded: PropTypes.bool
};

export default HeaderContentMobile;
