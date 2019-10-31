import { combineReducers } from 'redux'
import search from './search'
import items from './items'

const rootReducer = combineReducers({
    search,
    items
});

export default rootReducer