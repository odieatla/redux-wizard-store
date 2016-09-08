import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HeaderContentMobile from '../src/components/HeaderContentMobile';

describe('<HeaderContentMobile />', () => {
	it('should render <SearchForm />', () => {
		const wrapper = shallow(<HeaderContentMobile />);
		expect(wrapper.find('SearchForm')).have.length(1);
	})

	it('should not expand', () => {
		const wrapper = shallow(<HeaderContentMobile />);
		expect(wrapper.find('.comGlobalHeader__mobileContent')
			.hasClass('is-mobile-nav-expanded'))
			.to.be.false;
	})

	it('should expand', () => {
		const wrapper = shallow(<HeaderContentMobile isMobileNavExpanded={true} />);
		expect(wrapper.find('.comGlobalHeader__mobileContent')
			.hasClass('is-mobile-nav-expanded'))
			.to.be.true;
	})

	it('should not render <NavigationItem />', () => {
		const wrapper = shallow(<HeaderContentMobile />);
		expect(wrapper.find('NavigationItem'))
			.have.length(0);
	})

	it('should render <NavigationItem />', () => {
		const navs = [
			{ text: 'nav1', href: '#' },
			{ text: 'nav2', href: '#' },
		]

		const wrapper = shallow(<HeaderContentMobile navs={[...navs]} />);

		expect(wrapper.find('NavigationItem'))
			.have.length(2);

	})
})
