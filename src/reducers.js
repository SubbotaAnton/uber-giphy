import { combineReducers } from 'redux'
import {
    SET_SEARCH,

    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,

    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILURE,
} from './actions'

const initialState = {
    isFetching: false,
    isUpdating: false,
    completed: false,
    data: {
        items: [],
        pagination: {},
        offset: 0
    }
};

function search( state = { value : ''}, action ) {
    switch ( action.type ) {
        case SET_SEARCH:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}

function items( state = initialState, action ) {
    switch ( action.type ) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                completed: false,
                isFetching: true
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                completed: action.items.length === action.pagination.total_count,
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
                completed: state.data.offset + action.items.length === action.pagination.total_count,
                data: {
                    items: [ ...state.data.items, ...action.items ],
                    pagination: action.pagination,
                    offset: state.data.offset + action.items.length
                }
            };
        case UPDATE_DATA_FAILURE:
            return {
                ...state,
                isUpdating: false
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    search,
    items
});

export default rootReducer