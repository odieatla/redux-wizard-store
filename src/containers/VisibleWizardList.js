import { connect } from 'react-redux';
import WizardList from '../components/WizardList';
import { clickWizard } from '../actions';

const mapStateToProps = (state) => {
	return {
		wizards: state.wizards
	}
}

const VisibleWizardList = connect(
	mapStateToProps
)(WizardList)

export default VisibleWizardList
