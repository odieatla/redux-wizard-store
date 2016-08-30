import { normalize } from 'normalizr';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes'
import * as GLOBAL_VARS from '../constants/GlobalVars'
import { wizardSchema, wizardsSchema, authorSchema } from '../schema'


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

export function requestUpdateWizard() {
	return { type: types.REQUEST_UPDATE_WIZARD }
}

// @param timestamp for test purpose
export function receiveWizard(json, timestamp) {
	return {
		...json,
		type: types.RECEIVE_WIZARD,
		receivedAt: timestamp || Date.now()
	}
}

export function fetchWizard(id, timestamp) {
	return function(dispatch, getState) {
		dispatch(requestWizard());

		return fetch(`${GLOBAL_VARS.API_SERVER}wizards/${id}`)
			.then(resp => resp.json())
			.then((json) => {
				const data = normalize(json, wizardSchema);
				console.log(getState());
				dispatch(receiveWizard(data, timestamp));
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

// @param timestamp for test purpose
export function receiveWizards(json, timestamp) {
	return {
		...json,
		type: types.RECEIVE_WIZARDS,
		receivedAt: timestamp || Date.now()
	}
}

export function fetchWizards() {
	return function (dispatch) {
		dispatch(requestWizards());

		return fetch(`${GLOBAL_VARS.API_SERVER}wizards`)
			.then(response => response.json())
			.then((json) => {
				// TODO: if no json.data.wizards?
				const data = normalize(json, wizardsSchema);
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

// trigger middleware redirect to /wizard/${id}
export function redirectWizard(id) {
	return {
		type: types.REDIRECT_WIZARD,
		redirectTo: `/wizard/${id}`
	}
}

export function updateWizard(formData) {
	const { id } = formData;
	return (dispatch) => {
		dispatch(requestUpdateWizard())

		return fetch(`${GLOBAL_VARS.API_SERVER}wizards/${id}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then(response => response.json())
			.then((json) => {
				const data = normalize(json, wizardSchema);
				dispatch(receiveWizard(data));
				dispatch(redirectWizard(id));
			})
			.catch((err) => {
				dispatch(reportSaveError('wizard'));
      })
	}
}

export function dragInWizardFile() {
	return {
		type: types.DRAG_IN_WIZARD_FILE
	}
}

export function dragOutWizardFile() {
	return {
		type: types.DRAG_OUT_WIZARD_FILE
	}
}

export function startUploadWizardFile(filename) {
	return {
		type: types.START_UPLOAD_WIZARD_FILE,
		filename
	}
}

export function UploadWizardFileSuccess() {
	return {
		type: types.UPLOAD_WIZARD_FILE_SUCCESS
	}
}

export function UploadWizardFileError(error) {
	return {
		type: types.UPLOAD_WIZARD_FILE_ERROR,
		error
	}
}

export function uploadWizardFile(file) {
	return (dispatch) => {
		dispatch(startUploadWizardFile(file.name))

		const data = new FormData()
		data.append('file', file)

		return fetch(`${GLOBAL_VARS.API_SERVER}upload`, {
			method: 'POST',
			body: data
		})
			.then(resp => resp.json())
      .then((json) => {
				dispatch(UploadWizardFileSuccess());
      })
      .catch((err) => {
				dispatch(UploadWizardFileError(err));
      })
	}
}

export function showDropZone() {
	return {
		type: types.SHOW_DROP_ZONE
	}
}

export function hideDropZone() {
	return {
		type: types.HIDE_DROP_ZONE
	}
}
