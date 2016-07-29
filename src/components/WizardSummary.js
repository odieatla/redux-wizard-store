import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const WizardSummary = ({ onClick, version, description, name, id }) => (
	<li>
		<Link to={`/wizard/${id}`}>
		<span className="wizard-summary-title">{name}</span>
		<span className="wizard-summary-version">{version}</span>
		<span className="wizard-summary-description">{description}</span>
		</Link>
	</li>
)

WizardSummary.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default WizardSummary
