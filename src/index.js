import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import VisibleWizardList from './containers/VisibleWizardList';
import WizardPage from './containers/WizardPage';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import * as reducers from './reducers';

const wizardStoreApp = combineReducers(reducers);

let store = createStore(wizardStoreApp);

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={VisibleWizardList} />
				<Route path="wizard/:wizardId" component={WizardPage} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)
