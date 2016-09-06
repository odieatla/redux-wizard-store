import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';

class HeaderContent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isNavSearchExpanded: false
		}

		this.handleClickSearch = this.handleClickSearch.bind(this);
		this.handleClickClearButton = this.handleClickClearButton.bind(this);
	}

	handleClickSearch() {
		this.setState({
			isNavSearchExpanded: !this.state.isNavSearchExpanded
		});
	}

	handleClickClearButton() {
		this._searchForm.reset();
	}

	render() {
		const { navs, handleToggleMenuMobile } = this.props
		const isNavSearchExpanded = this.state.isNavSearchExpanded
		let searchFormClass = 'comGlobalHeader__navItem comGlobalHeader__navItemSearchForm';
		if (isNavSearchExpanded) {
			searchFormClass = `${searchFormClass} is-nav-search-expanded`;
		}

		return (
			<div className="comGlobalHeader__content">
				<Link to={'/'} className="comGlobalHeader__logo logo-edgemax">
					<span className="icon ubnt-icon--edgemax" />
				</Link>
				<NavigationList customizedClasses={[]}>
					{ navs.map(nav => (
						<NavigationItem key={nav.text} {...nav} />
					))}
				</NavigationList>
				<NavigationList customizedClasses={['comGlobalHeader__navRight']}>
					<li className={searchFormClass}>
						<form name="search" action="/" method="get" className="comFormSearch"
						  ref={(c) => this._searchForm = c}>
							<a className="comFormSearch__clearButton js-search-clear"
							  onClick={this.handleClickClearButton}>
								<span className="icon ubnt-icon--x"></span>
							</a>
							<input name="q" type="text" required className="comFormSearch__input" />
						</form>
					</li>
					<li onClick={this.handleClickSearch}
					    className="comGlobalHeader__navItem comGlobalHeader__navItemSearch" >
						<a className="comGlobalHeader__navItemLink">
							<span className="icon ubnt-icon--search-2">
								<span className="offstage">Search</span>
							</span>
						</a>
					</li>
				</NavigationList>
				<div className="comGlobalHeader__navItem comGlobalHeader__navItemMobile">
					<Link to={"#"} className="comGlobalHeader__navItemLink"
					 onClick={handleToggleMenuMobile}>
						<span className="icon ubnt-icon--menu">
							<span className="offstage">Menu</span>
						</span>
					</Link>
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
