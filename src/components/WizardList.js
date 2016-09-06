import React, { Component, PropTypes } from 'react';
import WizardSummary from './WizardSummary';

class WizardList extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.loadData();
	}

	componentWillReceiveProps(nextProps) {
		nextProps.loadData();
	}

	render() {
		const { isFetching } = this.props.pagination;
		const { wizards } = this.props;

		if (isFetching) {
			return (<div>Loading</div>);
		}

		return (
			<ul>
				{ wizards.map(w => (
					<WizardSummary key={w.id} { ...w } />
				))}
			</ul>
		);
	}
}

WizardList.propTypes = {
	wizards: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		version: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	})).isRequired,
	pagination: PropTypes.shape({
		isFetching: PropTypes.bool.isRequired,
		didInvalidate: PropTypes.bool.isRequired,
		updatedAt: PropTypes.number.isOptional
	}),
	loadData: PropTypes.func.isRequired
};

export default WizardList;
