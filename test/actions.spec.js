import { expect } from 'chai'
import * as actions from '../src/actions'
import * as types from '../src/constants/ActionTypes'
import * as GLOBAL_VARS from '../src/constants/GlobalVars'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { normalize } from 'normalizr'
import { wizardSchema, wizardsSchema, authorSchema } from '../src/schema'

// for async actions
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
	const wizard = {
		author: 1,
		id: 2,
		description: 'test wizard',
		name: 'test wizard',
		version: '0.0.0'
	};
	const json = {
		entities: {
			authors: {
				1: {
					id: 1,
					name: 'test_user'
				}
			},
			wizards: {
				2: { ...wizard }
			}
		}
	};

	const timestamp = Date.now();

	describe('sync actions', () => {
		it('should return action type REQUEST_WIZARD', () => {
			const expectedAction = { type: types.REQUEST_WIZARD };
			expect(actions.requestWizard()).to.deep.equal(expectedAction);
		})

		it('should receive a wizard', () => {
			const expectedAction = {
				...json,
				type: types.RECEIVE_WIZARD,
				receivedAt: timestamp
			}

			let actualAction = actions.receiveWizard(json, timestamp);

			expect(actualAction).to.deep.equal(expectedAction);
		})

		it('should return action type REQUEST_WIZARDS', () => {
			const expectedAction = { type: types.REQUEST_WIZARDS };
			expect(actions.requestWizards()).to.deep.equal(expectedAction);
		})

		it('should receive wizard list', () => {
			const expectedAction = {
				...json,
				type: types.RECEIVE_WIZARDS,
				receivedAt: timestamp
			}

			let actualAction = actions.receiveWizards(json, timestamp);

			expect(actualAction).to.deep.equal(expectedAction);
			
		})
	})

	describe('async actions', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		describe('fetch wizard', () => {
			it('should successful fetch wizard', () => {
				nock(GLOBAL_VARS.API_SERVER)
					.get(`/wizards/${wizard.id}`)
					.reply('200', {
						...wizard
					})

				const expectedActions = [
					{ type: types.REQUEST_WIZARD },
					{ type: types.RECEIVE_WIZARD,
						...normalize(wizard, wizardSchema),
						receivedAt: timestamp }
				];

				const store = mockStore()

				return store.dispatch(actions.fetchWizard(2, timestamp))
					.then(() => {
						expect(store.getActions()).to.deep.equal(expectedActions)
					})
			})

			it('wizard not found', () => {
				nock(GLOBAL_VARS.API_SERVER)
					.get(`/wizards/${wizard.id}`)
					.reply('404')

				const expectedActions = [
					{ type: types.REQUEST_WIZARD },
					{ type: types.REPORT_NOT_FOUND, entity: 'wizard' }
				];

				const store = mockStore()

				return store.dispatch(actions.fetchWizard(2, timestamp))
					.then(() => {
						expect(store.getActions()).to.deep.equal(expectedActions)
					})
			})
		})
	})


})
