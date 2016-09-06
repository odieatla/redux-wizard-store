import React, { Component } from 'react';
import NavigationList from '../components/NavigationList';
import HeaderContent from '../components/HeaderContent';
import HeaderContentMobile from '../components/HeaderContentMobile';

require('../stylesheets/header.scss')

const navs = [
	{ text: 'Wizards', href: '#' },
	{ text: 'Contributors', href: '#' }
];

class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isMobileNavExpanded: false
		}
		this.handleToggleMenuMobile = this.handleToggleMenuMobile.bind(this)
	}

	handleToggleMenuMobile() {
		this.setState({
			isMobileNavExpanded: !this.state.isMobileNavExpanded
		});
	}

	render() {
		return (
			<header>
				<div className="comGlobalHeader">
					<HeaderContent navs={navs} handleToggleMenuMobile={this.handleToggleMenuMobile} />
					<HeaderContentMobile navs={navs} {...this.state}/>
				</div>
			</header>
		)
	}
}

export default Header;
