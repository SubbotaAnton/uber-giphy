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

// here should be several test cases for this action, but I haven't enough time to implement all of them
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
        completed: true,
        data: {
            items: [2, 3],
            pagination: {
                total_count: 2
            },
            offset: 2
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

// here should be several test cases for this action, but I haven't enough time to implement all of them
// for example different cases when completed is false or true
// also possible to move calculating of completed to helper function and test it separately
test("UPDATE_DATA_REQUEST action changes 'isUpdating' to true", () => {
    const action = {
        type: UPDATE_DATA_REQUEST
    };

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

    expect(items(initialState, action)).toStrictEqual({
        isFetching: false,
        isUpdating: true,
        completed: false,
        data: {
            items: [],
            pagination: {},
            offset: 0
        }
    });
});

test("UPDATE_DATA_SUCCESS action changes 'isUpdating' to false, expand data, calculate completed", () => {
    const action = {
        type: UPDATE_DATA_SUCCESS,
        items: [3, 4],
        pagination: {
            total_count: 4
        }
    };

    const initialState = {
        isFetching: false,
        isUpdating: true,
        completed: false,
        data: {
            items: [1, 2], // just example, better create mock files and use Typescript also
            pagination: {
                total_count: 4
            },
            offset: 2
        }
    };

    expect(items(initialState, action)).toStrictEqual({
        isFetching: false,
        isUpdating: false,
        completed: true,
        data: {
            items: [1, 2, 3, 4],
            pagination: {
                total_count: 4
            },
            offset: 4
        }
    });
});

test("UPDATE_DATA_FAILURE action changes 'isUpdating'", () => {
    const action = {
        type: UPDATE_DATA_FAILURE
    };

    const initialState = {
        isFetching: false,
        isUpdating: true,
        completed: false,
        data: {
            items: [1, 2],
            pagination: {
                total_count: 100
            },
            offset: 2
        }
    };

    expect(items(initialState, action)).toStrictEqual({
        isUpdating: false,
        isFetching: false,
        completed: false,
        data: {
            items: [1, 2],
            pagination: {
                total_count: 100
            },
            offset: 2
        }
    });
});