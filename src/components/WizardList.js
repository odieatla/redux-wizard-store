import React, { PropTypes } from 'react';
import WizardSummary from './WizardSummary';

const WizardList = ({ wizards }) => (
	<ul>
		{ Object.keys(wizards).map(id => {
				const w = { ...wizards[id], id: Number(id) };
				return (
					<WizardSummary
						key={id}
						{ ...w }
					/>
				);
			}
		)}
	</ul>
)

WizardList.propTypes = {
	wizards: PropTypes.object.isRequired
};

export default WizardList;
