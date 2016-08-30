import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import redirect from '../middleware/redirect'
import DevTools from '../containers/DevTools'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk, redirect, createLogger()),
			DevTools.instrument()
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		})
	}

	return store
}
