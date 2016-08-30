import React from 'react'
import { connect } from 'react-redux'
import WizardEdit from '../components/WizardEdit'
import { fetchWizardIfNeeded, updateWizard, showDropZone, hideDropZone } from '../actions'

const mapStateToProps = (state, ownProps) => {
	const id = Number(ownProps.params.wizardId);
	console.error(state);

	const {
		entities: { wizards, users },
		fileUpload: { isUploading, originalFilename, uploadedSuccess }
	} = state;

	if (!wizards[id]) {
		return { wizardId: id }
	}

	return {
		wizard: { ...wizards[id] },
		upload: { isUploading, originalFilename, uploadedSuccess },
		wizardId: id
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const id = Number(ownProps.params.wizardId);

	return {
		loadData: () => dispatch(fetchWizardIfNeeded(id)),
		handleSubmit: (formData) => dispatch(updateWizard(formData)),
		handleChange,
		handleMount: () => dispatch(showDropZone()),
		handleUnmount: () => dispatch(hideDropZone())
	}
}

const handleChange = (value) => {
	console.error(value);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WizardEdit);
