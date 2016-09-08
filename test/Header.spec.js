import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Header from '../src/components/Header';

describe('<Header />', () => {
	it('should render <HeaderContent />', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find('HeaderContent'))
			.have.length(1);
	})

	it('should render <HeaderContentMobile />', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find('HeaderContentMobile'))
			.have.length(1);
	})
})
