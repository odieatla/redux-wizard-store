import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class WizardDetail extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.loadData(this.props.wizard);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.wizard.id !== this.props.wizard.id) {
			nextProps.loadData(nextProps);
		}
	}

	render() {
		const { id, name, version, description } = this.props.wizard;
		if (id === 0) {
			return <h1><i>Loading...</i></h1>
		}

		if (this.props.wizardId > 0 && id === undefined) {
			// TODO: redirect to 404 page
			return <h1><i>Not Found</i></h1>
		}

		return (
			<div>
				<div className="title">{ name }</div>
				<div className="version">Latest version: { version }</div>
				<div className="description">
					<label>Description</label>
					<div>{ description } </div>
				</div>
			</div>
		)
	}
}

WizardDetail.propTypes = {
	wizard: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		version: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	}),
	loadData: PropTypes.func.isRequired
}

WizardDetail.defaultProps = {
	wizard: {
		id: 0,
		name: 'default_w',
		version: '0.0.0',
		description: 'default wizard',
		special: '123'
	}
};

export default WizardDetail;
