import { normalize, Schema, arrayOf } from 'normalizr';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes'

/*
 * define schema
 */
const wizardSchema = new Schema('wizards');
const authorSchema = new Schema('authors');
wizardSchema.define({
	author: authorSchema
});

const API_SERVER = 'http://0.0.0.0:8080/api/';

/*
 * action creators
 */
let nextWizardId = 0;

export function addWizard(name, version, description) {
	return {
		type: types.ADD_WIZARD,
		id: nextWizardId++,
		name,
		version,
		description
	};
}

export function clickWizard(id) {
	return { type: types.CLICK_WIZARD, id }
}

export function requestWizard() {
	return { type: types.REQUEST_WIZARD }
}

export function receiveWizard(json) {
	return {
		...json,
		type: types.RECEIVE_WIZARD,
		received_at: Date.now()
	}
}

export function fetchWizard(id) {
	return function(dispatch, getState) {
		dispatch(requestWizard());

		return fetch(`${API_SERVER}wizards/${id}`)
			.then(resp => {
				if (resp.status == 404) {
					throw Error('no wizard');
				}
				return resp.json()
			})
			.then((json) => {
				const data = normalize(json, wizardSchema);
				console.log(getState());
				dispatch(receiveWizard(data));
			})
			.catch((err) => {
				dispatch(reportNotFound('wizard'));
				console.log(getState());
			})
	}
}

export function reportNotFound(entity) {
	// TODO: write a middleware to redirect??
	return {
		type: types.REPORT_NOT_FOUND,
		entity
	}
}

function shouldFetchWizard(state, id) {
	const {
		entities: {
			wizards,
			users
		},
		pagination: {
			wizardsById
		}
	} = state;

	if (!wizardsById || !wizards[Number(id)]) {
		return true
	} else {
		return false
	}
}

export function fetchWizardIfNeeded(id) {
	return (dispatch, getState) => {
		if (shouldFetchWizard(getState(), id)) {
			return dispatch(fetchWizard(id))
		} else {
			return Promise.resolve()
		}
	}
}

export function requestWizards() {
	return { type: types.REQUEST_WIZARDS }
}

export function receiveWizards(json) {
	return {
		...json,
		type: types.RECEIVE_WIZARDS,
		receivedAt: Date.now()
	}
}

export function fetchWizards() {
	return function (dispatch) {
		dispatch(requestWizards());

		return fetch(`${API_SERVER}wizards`)
			.then(response => response.json())
			.then((json) => {
				// TODO: if no json.data.wizards?
				const data = normalize(json, arrayOf(wizardSchema));
				dispatch(receiveWizards(data))
			});
	}
}

function shouldFetchWizards(state) {
	const {
		entities,
		pagination: {
			wizardsById
		}
	} = state;

	if (!wizardsById) {
		return true
	} else if (wizardsById.isFetching) {
		return false
	} else {
		return wizardsById.didInvalidate
	}
}

export function fetchWizardsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchWizards(getState())) {
			return dispatch(fetchWizards())
		} else {
			return Promise.resolve()
		}
	}
}
