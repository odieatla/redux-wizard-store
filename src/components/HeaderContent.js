import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';
import HeaderLogo from './HeaderLogo';
import SearchForm from './SearchForm';

class HeaderContent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isNavSearchExpanded: false
		}

		this.handleClickSearchExpand = this.handleClickSearchExpand.bind(this);
	}

	handleClickSearchExpand() {
		this.setState({
			isNavSearchExpanded: !this.state.isNavSearchExpanded
		});
	}

	render() {
		const { navs, handleToggleMenuMobile } = this.props
		const isNavSearchExpanded = this.state.isNavSearchExpanded
		let searchFormClass = 'comGlobalHeader__navItem ' +
		 'comGlobalHeader__navItemSearchForm ' +
		 'searchFormContainer';
		if (isNavSearchExpanded) {
			searchFormClass = `${searchFormClass} is-nav-search-expanded`;
		}

		return (
			<div className="comGlobalHeader__content">
				<HeaderLogo />
				<NavigationList customizedClasses={[]}>
					{ navs.map(nav => (
						<NavigationItem key={nav.text} {...nav} />
					))}
				</NavigationList>
				<NavigationList customizedClasses={['comGlobalHeader__navRight']}>
					<li className={searchFormClass}>
						<SearchForm />
					</li>
					<li onClick={this.handleClickSearchExpand}
					 className="comGlobalHeader__navItem comGlobalHeader__navItemSearch" >
						<a className="comGlobalHeader__navItemLink">
							<span className="icon ubnt-icon--search-2">
								<span className="offstage">Search</span>
							</span>
						</a>
					</li>
				</NavigationList>
				<div className="comGlobalHeader__navItem comGlobalHeader__navItemMobile">
					<a href={"#"} className="comGlobalHeader__navItemLink toggle_mobile_menu"
					 onClick={handleToggleMenuMobile}>
						<span className="icon ubnt-icon--menu">
							<span className="offstage">Menu</span>
						</span>
					</a>
				</div>
			</div>
		)
	}
}

HeaderContent.propTypes = {
	navs: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired
	})).isRequired,
	handleToggleMenuMobile: PropTypes.func.isRequired
};

export default HeaderContent;
