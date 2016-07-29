/*
 * action types
 */

export const ADD_WIZARD = 'ADD_WIZARD';
export const EDIT_WIZARD = 'EDIT_WIZARD';
export const DELETE_WIZARD = 'DELETE_WIZARD';
export const CLICK_WIZARD = 'CLICK_WIZARD';


/*
 * action creators
 */
let nextWizardId = 0;

export function addWizard(name, version, description) {
	return {
		type: ADD_WIZARD,
		id: nextWizardId++,
		name,
		version,
		description
	};
}

export function clickWizard(id) {
	return { type: CLICK_WIZARD, id }
}
