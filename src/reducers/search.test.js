import search from './search';

import {
    SET_SEARCH,
} from '../actions/actions'

test("SET_SEARCH action rewrites value of 'value'", () => {
    const action = {
        type: SET_SEARCH,
        value: 'value'
    };

    expect(search({}, action)).toStrictEqual({ value: 'value' });
});