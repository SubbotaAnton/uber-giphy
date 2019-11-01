import React from 'react';
import { shallow } from 'enzyme';
import List from './List';
import Item from '../Item/Item';
import styles from "./List.module.css";
import { item1, item2, item3 } from "../Item/mocks/items";

describe('<List />', () => {

    it('renders without crashing', () => {
        shallow(<List items={[]}/>);
    });

    it('renders message about no results', () => {
        const wrapper = shallow(<List items={[]} />);
        const noResult = <div className={styles.NoResult}>There is no result</div>;
        expect(wrapper.contains(noResult)).toEqual(true);
    });

    it('renders three <Item /> components', () => {
        const wrapper = shallow(<List items={[item1, item2, item3]}/>);
        expect(wrapper.find(Item).length).toBe(3);
    });

    it('renders an <ul>', () => {
        const wrapper = shallow(<List items={[item1, item2, item3]}/>);
        expect(wrapper.find('ul').length).toBe(1);
    });

});