import React from 'react';
import { connect } from 'react-redux';
import WizardDetail from '../components/WizardDetail';

const mapStateToProps = (state, ownProps) => {
	const id = Number(ownProps.params.wizardId);

	return { ...state.wizards[id], id };
}

export default connect(mapStateToProps)(WizardDetail);
