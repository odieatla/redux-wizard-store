import { REDIRECT_WIZARD } from '../constants/ActionTypes'
import { browserHistory } from 'react-router'

// A Redux middleware that interprets actions with action type
// redirect to given url or to '/' by default
export default store => next => action => {
	if (typeof action !== 'object') {
		return next(action)
	}

	const { type, redirectTo } = action;

	if (type !== REDIRECT_WIZARD) {
		return next(action)
	}

	if (redirectTo) {
		browserHistory.push(redirectTo);
	} else {
		browserHistory.push('/');
	}

	return next(action)
}
