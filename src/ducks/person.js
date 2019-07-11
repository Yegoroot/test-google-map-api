
import { put, takeEvery, call } from 'redux-saga/effects'
import { appName } from '../utils/config'
import { generateId } from '../utils/utils'
import { push } from 'connected-react-router'
import { delay } from 'redux-saga/effects'

const initState = {
	isSend: false,
	data: {
		id:  null,
		name: null,
		lastName: null,
		category: null,
		model: null,
		year: null,
		speed: null
	}
}




// CONSTANTS
export const moduleName = 'person'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`

// REDUCER
export default function reducer(state = initState, action) {
	const { type, payload } = action

	switch (type) {
		case ADD_PERSON_REQUEST:
			return Object.assign({}, state, {
				...state,
				isSend :true
			})
		case ADD_PERSON:
			return Object.assign({}, state, {
				...state,
				data: {
					...payload
				},
				isSend: false
			})
		default:
			return state
	}
}

// ACTIONS
export function addPerson(person) {
	return {
		type: ADD_PERSON_REQUEST,
		payload: person,
	}
}

// SAGAS
export const addPersonSaga = function*(action) {
	const id = yield call(generateId)
	
	yield delay (1200)
	yield put({
		type: ADD_PERSON,
		payload: { ...action.payload, id },
	})
	yield put(push('/list'))
}



// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
	yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga) // слушаем события экшена ADD_PERSON_REQUEST и передаем их саге addPersonSaga
}
