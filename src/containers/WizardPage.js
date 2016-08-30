import React from 'react';
import moment from 'moment';
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
			updatedAt: 1234556,
			description: 'w'
		};

		return { wizardId: id }
	};

	const updatedAt = moment(wizards[id]['updatedAt']).format('M/D/YYYY');

	return { wizard: { ...wizards[id], updatedAt }, wizardId: id }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const id = Number(ownProps.params.wizardId);

	return {
		loadData: () => dispatch(fetchWizardIfNeeded(id)),
		onClickDownload
	}
}

const onClickDownload = () => {
	console.error('start to download');
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WizardDetail);
