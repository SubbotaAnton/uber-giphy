import React from 'react';
import { mount, shallow } from 'enzyme';
import { Grid } from './Grid';
import { item1, item2, item3 } from "../../components/Item/mocks/items";
import List from "../../components/List/List";
import Loading from "../../components/Loading/Loading";

describe('<Grid />', () => {
    const items = [ item1, item2, item3 ];
    const mockDispatch = jest.fn();
    const pagination = {
        total_count: 10
    };

    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Grid isFetching={false} pagination={pagination} dispatch={mockDispatch} completed={false} items={items}/>);
        mockDispatch.mockReset();
    });

    it('it renders loading when isFetching is true', () => {
        let wrapper = mount(<Grid isFetching={true} pagination={pagination} dispatch={mockDispatch} completed={false} items={items}/>);
        const render =
            <div className="Container">
                <Loading />
            </div>;
        expect(wrapper.containsMatchingElement(render)).toEqual(true);
    });

    it('it renders empty div when isFetching is false', () => {
        expect(wrapper.find(List).length).toBe(1);
    });

    it('do not render when totalCount is undefined', () => {
        let emptyPagination = {};
        let wrapper = mount(<Grid isFetching={false} pagination={emptyPagination} dispatch={mockDispatch} completed={false} items={items}/>);
        expect(wrapper.html()).toEqual('<div class="Container"></div>');
    });

});