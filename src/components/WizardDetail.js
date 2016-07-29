import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let WizardDetail = ({ id, name, version, description }) => (
	<div>
		<div className="title">{ name }</div>
		<div className="version">Latest version: { version }</div>
		<div className="description">
			<label>Description</label>
			<div>{ description } </div>
		</div>
	</div>
);

WizardDetail.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
}

export default WizardDetail;
