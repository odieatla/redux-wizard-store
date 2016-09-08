import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import SearchForm from '../src/components/SearchForm';

describe('<SearchForm />', () => {
	it('should contains a search input', () => {
		const wrapper = shallow(<SearchForm />);
		expect(wrapper.find('input')).have.length(1);
	})

	it('should contains a clear button', () => {
		const wrapper = shallow(<SearchForm />);
		expect(wrapper.find('a.comFormSearch__clearButton'))
		 .have.length(1);
	})

	it('should have search icon if props.isMobile set to true', () => {
		const mobileWrapper = shallow(<SearchForm isMobile={true} />);
		expect(mobileWrapper.find('button.comFormSearch__submitButton'))
			.have.length(1);

		const wrapper = shallow(<SearchForm />);
		expect(wrapper.find('button.comFormSearch__submitButton'))
			.have.length(0);
	});

	describe('click clear button', () => {
		it('should initial with value ""', () => {
			const wrapper = mount(<SearchForm />);
			const searchBar = wrapper.find('input');

			expect(searchBar.prop('value')).to.equal('');
		})

		it('should have value after change', () => {
			const wrapper = mount(<SearchForm />);
			const searchBar = wrapper.find('input');

			searchBar.simulate('change',
				{ target: { value: 'a' }});

			expect(searchBar.prop('value')).to.equal('a');
		});

		it('should clear input when click clear button', () => {
			const wrapper = mount(<SearchForm />);
			const searchBar = wrapper.find('input');

			searchBar.simulate('change',
        { target: { value: 'a' }});

			const clearButton = wrapper.find('a');
			clearButton.simulate('click');

			expect(searchBar.prop('value')).to.equal('');
		});
	})
})
