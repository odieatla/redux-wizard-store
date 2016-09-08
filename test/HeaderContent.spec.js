import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import HeaderContent from '../src/components/HeaderContent'

const props = {
	navs: [
		{ text: 'menu 1', href: '#' },
		{ text: 'menu 2', href: '#' }
	],
	handleToggleMenuMobile: spy()
}

describe('<HeaderContent />', () => {
	it('should has default state isNavSearchExpanded(false)', () => {
		const wrapper = shallow(<HeaderContent {...props} />);
		expect(wrapper.state('isNavSearchExpanded'))
			.to.be.defined;
		expect(wrapper.state('isNavSearchExpanded'))
			.to.be.false;
	})

	it('should have two NavigationList', () => {
		const wrapper = shallow(<HeaderContent {...props} />);
		expect(wrapper.find('NavigationList')).have.length(2);
	})

	it('should render all navs', () => {
		const wrapper = shallow(<HeaderContent {...props} />);
		expect(wrapper.find('NavigationItem'))
			.have.length(props.navs.length);
	})

	it('should render logo', () => {
		const wrapper = shallow(<HeaderContent {...props} />);
		expect(wrapper.find('HeaderLogo'))
			.have.length(1);
	})

	it('should render search form', () => {
		const wrapper = shallow(<HeaderContent {...props} />);
		expect(wrapper.find('SearchForm')).have.length(1);
	})

	describe('clicking the icon', () => {
		const wrapper = shallow(<HeaderContent {...props} />);
		const searchIcon = wrapper.find('.comGlobalHeader__navItemSearch')

		it('should render icon', () => {
			expect(searchIcon).have.length(1);
		})

		it('should have search bar collapsed by default', () => {
			expect(wrapper.find('.comGlobalHeader__navItemSearchForm')
				.hasClass('is-nav-search-expanded'))
				.to.be.false;
		})

		it('should have search bar expanded after clicking icon', () => {
			searchIcon.simulate('click');
			expect(wrapper.find('.comGlobalHeader__navItemSearchForm')
				.hasClass('is-nav-search-expanded'))
				.to.be.true;
		})

		it('should toggle mobile menu when clicking', () => {
			const handleToggleMenuMobile = spy();
			const newProps = { ...props, handleToggleMenuMobile };

			const wrapper = mount(<HeaderContent {...newProps} />);
			wrapper.mount().find('.toggle_mobile_menu')
				.simulate('click', { button: 0 });

			expect(handleToggleMenuMobile.calledOnce).to.be.true;
			
		})
	})

})
