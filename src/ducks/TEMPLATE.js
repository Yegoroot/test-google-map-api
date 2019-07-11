import { appName } from '../_general/config'
import { Record } from 'immutable'
import { all } from 'redux-saga/effects'

/**
 * CONSTANTS
 **/
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const CONST_EXAMPLE = `${prefix}/CONST_EXAMPLE`

/**
 * REDUCER
 **/
const ReducerRecord = Record({})

export default function reducer(state = new ReducerRecord(), action) {
    const { type } = action

    switch (type) {
        default:
            return state
    }
}

/**
 * SELSECTORS
 **/

/**
 * ACTION CREATORS
 **/

/**
 * SAGAS
 **/
export const saga = function*() {
    yield all([])
}
