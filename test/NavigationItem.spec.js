import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import NavigationItem from '../src/components/NavigationItem';

const props = {
	text: 'menu 1',
	href: '#'
};

describe('<NavigationItem />', () => {
	const wrapper = shallow(<NavigationItem { ...props } />);

	it('should have class comGlobalHeader__navItem', () => {
		expect(wrapper.hasClass('comGlobalHeader__navItem'))
			.to.be.true;
	})

	it('should have props for text and href', () => {
		expect(wrapper.props().text).to.be.defined;
		expect(wrapper.props().href).to.be.defined;
	})

	it('should render with text', () => {
		expect(wrapper.render().find('a').text())
			.to.equal('menu 1');
	})

	// TODO
/*
	it('should render with href', () => {
		expect(wrapper.render().find('a').prop('to'))
			.to.equal('#');
	})
*/
})
