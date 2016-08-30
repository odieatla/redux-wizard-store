import React from 'react'
import { connect } from 'react-redux'
import DropZone from '../components/DropZone'
import { dragInWizardFile, dragOutWizardFile, uploadWizardFile } from '../actions'

const mapStateToProps = state => {
	const { isActive } = state.fileUpload

	return { isActive }
}

const mapDispatchToProps = dispatch => {
	return {
		handleDragEnter: () => dispatch(dragInWizardFile()),
		handleDragLeave: () => dispatch(dragOutWizardFile()),
		handleFileDrop: (file) => dispatch(uploadWizardFile(file))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DropZone);
