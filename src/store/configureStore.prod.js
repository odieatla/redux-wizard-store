import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import redirect from '../middleware/redirect'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(thunk, redirect)
	)
}
