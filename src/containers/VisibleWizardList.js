import { connect } from 'react-redux';
import WizardList from '../components/WizardList';
import { fetchWizardsIfNeeded } from '../actions';

const mapStateToProps = (state) => {
	const {
		pagination: { wizardsById },
		entities: { wizards }
	} = state;

	const pagination = wizardsById;

	return {
		pagination,
		wizards: wizardsById.ids.map(id => wizards[id])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadData: () => dispatch(fetchWizardsIfNeeded())
	}
}

const VisibleWizardList = connect(
	mapStateToProps,
	mapDispatchToProps
)(WizardList)

export default VisibleWizardList
