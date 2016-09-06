import React, { PropTypes } from 'react';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';

const HeaderContentMobile = ({ navs, isMobileNavExpanded }) => {
	let headerClass = 'comGlobalHeader__mobileContent';
	if (isMobileNavExpanded) {
		headerClass = `${headerClass} is-mobile-nav-expanded`;
	}

	return (
		<div className={headerClass}>
			<NavigationList>
				<li className="comGlobalHeader__navItem comGlobalHeader__navItemSearchForm">
					<span className="icon ubnt-icon--magnifying-glass comGlobalHeader__navItemIcon"></span>
					<form name="search" action="/" method="get" className="comFormSearch comFormSearch--mobile">
						<div className="comFormSearch__searchBox">
							<a className="comFormSearch__clearButton js-search-clear">
								<span className="icon ubnt-icon--x"></span>
							</a>
							<input name="q" type="text" required className="comFormSearch__input" />
						</div>
						<button type="submit" className="comFormSearch__submitButton">
							<span className="icon ubnt-icon--search-2">
								<span className="offstage">Search</span>
							</span>
						</button>
					</form>
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
	})).isRequired,
	isMobileNavExpanded: PropTypes.bool.isRequired
};

export default HeaderContentMobile;
