
import { put, takeEvery } from 'redux-saga/effects'
import { appName } from '../utils/config'

const initState = {
	isSend: false,
	places: {
		places1: null,
		places2: null
	},
	distance: null
}




// CONSTANTS
export const moduleName = 'location'
const prefix = `${appName}/${moduleName}`
export const CHANGE_LOCATION_REQUEST = `${prefix}/CHANGE_LOCATION_REQUEST`
export const ADD_LOCATION = `${prefix}/ADD_LOCATION`
export const SET_DISTANCE_REQUEST = `${prefix}/SET_DISTANCE_REQUEST`
export const SET_DISTANCE = `${prefix}/SET_DISTANCE`

// REDUCER
export default function reducer(state = initState, action) {
	const { type, payload } = action

	switch (type) {
		case CHANGE_LOCATION_REQUEST:
			return Object.assign({}, state, {
				...state,
				isSend :true
			})
		case ADD_LOCATION:
			return Object.assign({}, state, {
				...state,
				places: {
					...state.places,
					...payload
				},
				isSend: false
			})
			case SET_DISTANCE:
				return Object.assign({}, state, {
					...state,
					distance :payload
				})
			
		default:
			return state
	}
}

// ACTIONS
export function changePlaces(payload) {
	// console.log('ACTION changePlaces', payload)
	return {
		type: CHANGE_LOCATION_REQUEST,
		payload,
	}
}
export function setDistance(payload) {
	return {
		type: SET_DISTANCE_REQUEST,
		payload,
	}
}

// SAGAS
export const changeLocationSaga = function*(action) {

	// console.log('SAGA changeLocationSaga', action)
	yield put({
		type: ADD_LOCATION,
		payload: { ...action.payload },
	})

}
export const setDistanceSaga = function*(action) {
	yield put({
		type: SET_DISTANCE,
		payload: action.payload,
	})

}



// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
	yield takeEvery(CHANGE_LOCATION_REQUEST, changeLocationSaga) 
	yield takeEvery(SET_DISTANCE_REQUEST, setDistanceSaga) 
}
