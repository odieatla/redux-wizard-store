import { ADD_WIZARD, EDIT_WIZARD, DELETE_WIZARD, CLICK_WIZARD } from '../actions';

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
		case ADD_WIZARD:
			return {
				name: action.name,
				version: action.version || '0.0.1',
				description: action.description
			};
		case EDIT_WIZARD:
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

const defaultWizards = {
	1: {
		name: 'ddns',
		version: '0.0.2',
		description: 'a wizard for quick ddns setup'
	},
	2: {
		name: 'static_mapping',
		version: '0.0.5',
		description: 'static mapping'
	}
};

export function wizards(state = defaultWizards, action) {
	switch (action.type) {
		case ADD_WIZARD:
			return {
				...state,
				[action.id]: wizard(undefined, action)
			};
		case EDIT_WIZARD:
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
		case DELETE_WIZARD:
			let wizardsLift = Object.assign({}, state);
			for (key in wizardsLeft) {
				if (key === action.id) {
					delete wizardsLeft[key];
				}
			}

			return wizardsLeft;

		case CLICK_WIZARD:
			console.error('direct to wizard page');
			return state;

		default:
			return state;
	}
};
