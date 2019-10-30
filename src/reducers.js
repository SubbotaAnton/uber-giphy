import { combineReducers } from 'redux'
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
} from './actions'

const initialState = {
    isFetching: false,
    isUpdating: false,
    data: {
        items: [],
        pagination: {},
        offset: 0
    }
};

function items( state = initialState, action ) {
    switch ( action.type ) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: {
                    items: action.items,
                    pagination: action.pagination,
                    offset: action.items.length
                }
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                data: {
                    items: [],
                    pagination: {}
                }
            };
        case UPDATE_DATA_REQUEST: {
            return {
                ...state,
                isUpdating: true
            }
        }
        case UPDATE_DATA_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                data: {
                    items: [ ...state.data.items, ...action.items ],
                    pagination: action.pagination,
                    offset: state.data.offset + action.items.length
                }
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    items
});

export default rootReducer