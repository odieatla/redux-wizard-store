import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

class WizardEdit extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const { loadData, handleMount } = this.props;
		loadData(this.props.wizard);
		if (handleMount) {
			handleMount();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.wizardId !== this.props.wizardId) {
			nextProps.loadData(nextProps);
		}
	}

	componentWillUnmount() {
		console.error('un mount');
		if (this.props.handleUnmount) {
			this.props.handleUnmount();
		}
	}

	sendFormData() {
		const formData = {
			version: findDOMNode(this.refs.version).value,
			description: findDOMNode(this.refs.description).value,
			id: this.props.wizard.id
		};

		this.props.handleSubmit(formData);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		let valid = true // TODO: validation in here?

		if (valid) {
			this.sendFormData();
		}
	}

	render() {
		if (!this.props.wizard) {
			return <h1>Loading...</h1>
		}

		const {
			wizard: { id, name, version, description },
			upload: { originalFilename, isUploading, uploadedSuccess }
		} = this.props;

		const { handleChange } = this.props;

		const titleStyle = {
			width: 600,
			display: 'inline-block'
		};

		console.error(isUploading);
		const isLoadingStyle = {
			display: isUploading ? '': 'none'
		}

		return (
			<form onSubmit={this.handleFormSubmit.bind(this)}>
				<fieldset className="fields">
					<div className="title">
					<h1 style={titleStyle}>{ name }</h1>
					<Link to={`/wizard/${id}`}>
						<span>X</span>
					</Link>
					</div>
					<div>
						<label>Version</label>
						<input type="text" name="version" 
							ref="version"
							defaultValue={version}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label>Description</label>
						<textarea name="description"
							ref="description"
							defaultValue={description}
						/>
					</div>
					<div>
						<label>Wizard file</label>
						<div>
							<div>{originalFilename}</div>
							<div>*Drag and drop wizard file to browser to upload</div>
						</div>
					</div>
					<div style={isLoadingStyle}>Loading...</div>
				</fieldset>
				<fieldset className="actions">
					<div className="submit">
						<button type="submit">Save</button>
					</div>
				</fieldset>
			</form>
		)
	}
}

WizardEdit.propTypes = {
	wizard: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		version: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	}),
	upload: PropTypes.shape({
		originalFilename: PropTypes.string,
		isUploading: PropTypes.bool.isRequired,
		uploadedSuccess: PropTypes.bool.isRequired
	}),
	wizardId: PropTypes.number.isRequired,
	loadData: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleMount: PropTypes.func,
	handleUnmount: PropTypes.func
};

export default WizardEdit;
