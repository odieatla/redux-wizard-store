import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import VisibleWizardList from './containers/VisibleWizardList';
import WizardPage from './containers/WizardPage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { fetchWizardsIfNeeded } from './actions';
import DevTools from './containers/DevTools'
import createLogger from 'redux-logger'

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk, createLogger()),
		DevTools.instrument()
	)
);

render(
	<Provider store={store}>
		<div>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={VisibleWizardList} />
					<Route path="wizard/:wizardId" component={WizardPage} />
				</Route>
			</Router>
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('root')
)
