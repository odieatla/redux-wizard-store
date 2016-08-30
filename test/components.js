import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import WizardDetail from '../src/components/WizardDetail'

const wizard = {
	id: 1,
	name: 'test_wizard',
	description: 'test wizard',
	version: '0.0.0'
};

function setup() {
	const props = {
		loadData: sinon.spy(),
		wizard,
		wizardId: wizard.id
	}

	const enzymeWrapper = shallow(<WizardDetail { ...props } />)

	return {
		props,
		enzymeWrapper
	}
}

describe('components', () => {
	describe('WizardDetail', () => {
		const { enzymeWrapper } = setup()
		it('should render title, version and description', () => {

			expect(enzymeWrapper.find('.title')).to.have.length(1);
			expect(enzymeWrapper.find('.version')).to.have.length(1);
			expect(enzymeWrapper.find('.description')).to.have.length(1);

		})

		// TODO: load data??
			
	})
})
