import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,

    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILURE,
} from '../actions/actions'

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
                // also possible to use library Reselect to compute derived data
                // but we don't need it really here
                // memoized also is not very helpful here
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

export default items