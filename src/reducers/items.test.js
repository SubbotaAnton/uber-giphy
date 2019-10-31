import items from './items';

import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,

    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILURE,
} from '../actions/actions'

test("FETCH_DATA_REQUEST action changes 'isFetching' to true and 'completed' to false", () => {
    const action = {
        type: FETCH_DATA_REQUEST
    };

    const initialState = {
        isFetching: false,
        isUpdating: false,
        completed: true,
        data: {
            items: [],
            pagination: {},
            offset: 0
        }
    };

    expect(items(initialState, action)).toStrictEqual({
        completed: false,
        isFetching: true,
        isUpdating: false,
        data: {
            items: [],
            pagination: {},
            offset: 0
        }
    });
});

test("FETCH_DATA_SUCCESS action changes 'isFetching' to false, calculate 'completed', rewrite items, pagination, offset", () => {
    const action = {
        type: FETCH_DATA_SUCCESS,
        items: [2, 3],
        pagination: {
            total_count: 2
        }
    };

    const initialState = {
        isFetching: true,
        isUpdating: false,
        completed: false,
        data: {
            items: [1, 2], // just example, better create mock files and use Typescript also
            pagination: {},
            offset: 0
        }
    };

    expect(items(initialState, action)).toStrictEqual({
        isFetching: false,
        isUpdating: false,
        completed: action.items.length === action.pagination.total_count,
        data: {
            items: [2, 3],
            pagination: {
                total_count: 2
            },
            offset: action.items.length
        }
    });
});

test("FETCH_DATA_FAILURE action changes 'isFetching' to false and reset data", () => {
    const action = {
        type: FETCH_DATA_FAILURE
    };

    const initialState = {
        isFetching: true,
        isUpdating: false,
        completed: false,
        data: {
            items: [],
            pagination: {},
            offset: 0
        }
    };

    expect(items(initialState, action)).toStrictEqual({
        isUpdating: false,
        isFetching: false,
        completed: false,
        data: {
            items: [],
            pagination: {}
        }
    });
});