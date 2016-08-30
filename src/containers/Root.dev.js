import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router';
import App from '../components/App'
import VisibleWizardList from '../containers/VisibleWizardList'
import WizardPage from '../containers/WizardPage'
import WizardEditPage from '../containers/WizardEditPage'
import DevTools from '../containers/DevTools'

export default class Root extends Component {
	render() {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<div>
					<Router history={history}>
						<Route path="/" component={App}>
							<IndexRoute component={VisibleWizardList} />
							<Route path="wizard/:wizardId" component={WizardPage} />
							<Route path="wizard_edit/:wizardId" component={WizardEditPage} />
						</Route>
					</Router>
					<DevTools />
				</div>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}
