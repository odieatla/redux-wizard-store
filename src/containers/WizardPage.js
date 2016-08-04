import React from 'react';
import { connect } from 'react-redux';
import WizardDetail from '../components/WizardDetail';
import { fetchWizardIfNeeded } from '../actions';

const mapStateToProps = (state, ownProps) => {
	const id = Number(ownProps.params.wizardId);

	const {
		entities: { wizards, users }
	} = state;

	if (!wizards[id]) {
		const defaultWizard = {
			id: 0,
			name: 'w',
			version: '0.0.0',
			description: 'w'
		};

		return { wizardId: id }
	};

	return { wizard: { ...wizards[id] }, wizardId: id }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const id = Number(ownProps.params.wizardId);

	return {
		loadData: () => dispatch(fetchWizardIfNeeded(id))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WizardDetail);
