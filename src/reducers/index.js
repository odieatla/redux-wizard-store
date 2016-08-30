import { combineReducers } from 'redux'
import merge from 'lodash/merge';
import * as types from '../constants/ActionTypes'

const compareWizards = (oldW, newW) => {
	const fields = ['name', 'description', 'version'];
	let diff = {};

	fields.forEach((field) => {
		if (oldW[field] !== newW[field]) {
			diff[field] = newW[field];
		}
	});

	return diff;
};

const wizard = (state, action) => {
	switch (action.type) {
		case types.ADD_WIZARD:
			return {
				name: action.name,
				version: action.version || '0.0.1',
				description: action.description
			};
		case types.EDIT_WIZARD:
			if (state.id !== action.id) {
				return state;
			}

			// nothing changes
			const diff = compareWizards(state, action);
			if (!Object.keys(diff).length) {
				return state;
			}

			return diff;
		default:
			return state;
	}
};

const defaultWizards = {};
const initEntities = {
	wizards: {},
	authors: {}
};
function entities(state = initEntities, action) {
	if (action.entities) {
		return merge({}, state, action.entities)
	}

	return state;
}

function usersById(state = [1, 3], action) {
	return state;
}

const initWizardIds = {
	isFetching: false,
	didInvalidate: true,
	ids: []
};
function wizardsById(state = initWizardIds, action) {
	let receivedWizards = [];
	if (action.entities && action.entities.wizards) {
		receivedWizards = Object.keys(action.entities.wizards).map(id => Number(id));
	}
	switch(action.type) {
		case types.RECEIVE_WIZARDS:
			return {
				isFetching: false,
				didInvalidate: false,
				updatedAt: action.receivedAt,
				ids: [ ...new Set([...state.ids, ...receivedWizards])]
			}

		case types.RECEIVE_WIZARD:
			return {
				...state,
				updatedAt: action.receivedAt,
				ids: [ ...new Set([...state.ids, ...receivedWizards])]
			}

		case types.REQUEST_WIZARDS:
			// is fetching
			return {
				...state,
				isFetching: true
			}

		default:
			return state;
	}
}

const pagination = combineReducers({
	wizardsById,
	usersById
});

const defaultRouting = {
	normal: true,
	redirect: null
};
function routing(state = defaultRouting, action) {
	switch (action.type) {
		case types.REPORT_NOT_FOUND:
			return {
				...state,
				normal: false,
				redirect: 404
			}

		default:
			return state
	}
}

const defaultFileUpload = {
	isActive: false,
	isUploading: false,
	originalFilename: null,
	uploadedFilename: null,
	isDragging: false,
	uploadedSuccess: false
};

function fileUpload(state = defaultFileUpload, action) {
	switch (action.type) {
		case types.DRAG_IN_WIZARD_FILE:
			console.error('drag in');
			return {
				...state,
				isDragging: true
			}
		case types.DRAG_OUT_WIZARD_FILE:
			console.error('drag out');
			return {
				...state,
				isDragging: false
			}
		case types.START_UPLOAD_WIZARD_FILE:
			return {
				...state,
				originalFilename: action.filename,
				isUploading: true,
				isDragging: false
			}
		case types.UPLOAD_WIZARD_FILE_SUCCESS:
			return {
				...state,
				isUploading: false,
				uploadedSuccess: true,
				uploadedError: ''
			}
		case types.UPLOAD_WIZARD_FILE_ERROR:
			return {
				...state,
				isUpload: false,
				uploadedSuccess: false,
				uploadedError: action.error
			}
		case types.SHOW_DROP_ZONE:
			return {
				...state,
				isActive: true
			}
		case types.HIDE_DROP_ZONE:
			return {
				...state,
				isActive: false
			}
		default:
			return state;
	}
}

function wizards(state = defaultWizards, action) {
	switch (action.type) {
		case types.ADD_WIZARD:
			return {
				...state,
				[action.id]: wizard(undefined, action)
			};
		case types.EDIT_WIZARD:
			let selectedWizard = {};
			for (let key in state) {
				if (key === action.id) {
					selectedWizard = wizard(state[key], action);
				}
			}

			if (!Object.keys(selectedWizard).length) {
				return state;
			}

			return {
				...state,
				[action.id]: selectedWizard
			}
		case types.DELETE_WIZARD:
			let wizardsLift = Object.assign({}, state);
			for (key in wizardsLeft) {
				if (key === action.id) {
					delete wizardsLeft[key];
				}
			}

			return wizardsLeft;

		case types.CLICK_WIZARD:
			return state;

		default:
			return state;
	}
};


const rootReducer = combineReducers({
	entities,
	pagination,
	routing,
	fileUpload
});

export default rootReducer;
