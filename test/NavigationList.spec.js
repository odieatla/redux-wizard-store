import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NavigationList from '../src/components/NavigationList';

describe('<NavigationList />', () => {
	it('should have class name comGlobalHeader__nav', () => {
		const wrapper = shallow(<NavigationList />);
		expect(wrapper.hasClass('comGlobalHeader__nav'))
			.to.be.true;
	})

	it('should accept customized class name', () => {
		const customizedClasses = ['c1', 'c2'];
		const wrapper = shallow(
			<NavigationList customizedClasses={customizedClasses}
		/>);
		expect(wrapper.hasClass('c1'))
			.to.be.true;
		expect(wrapper.hasClass('c2'))
			.to.be.true;
		expect(wrapper.hasClass('comGlobalHeader__nav'))
			.to.be.true;
	})

	it('should render children', () => {
		const wrapper = shallow(
			<NavigationList><li>menu 1</li></NavigationList>
		);
		expect(wrapper.render().find('li'))
			.to.have.length(1);
	})
})
