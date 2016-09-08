import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HeaderLogo from '../src/components/HeaderLogo';

describe('<HeaderLogo />', () => {
	it('should renders icon', () => {
		const wrapper = shallow(<HeaderLogo />);
		expect(wrapper.find('.icon'))
			.have.length(1);
	})
})
