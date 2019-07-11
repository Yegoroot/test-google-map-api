import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import personReduces, { moduleName as peopleModule } from '../ducks/person'
import history from '../history'
import locationReducer, { moduleName as locationModule } from '../ducks/location'

export default combineReducers({
    router: connectRouter(history),
    [peopleModule]: personReduces,
    [locationModule]: locationReducer,
})
