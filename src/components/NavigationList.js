import React, { Component, PropTypes } from 'react';

class NavigationList extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { customizedClasses, children } = this.props;
		let navClass = 'comGlobalHeader__nav';
		if (customizedClasses && customizedClasses.length) {
			navClass = `${navClass} ${customizedClasses.join(' ')}`;
		}

		return (
			<ul className={navClass}>
				{ children }
			</ul>
		)
	}
}

NavigationList.propTypes = {
	customizedClasses: PropTypes.array
};

export default NavigationList;
