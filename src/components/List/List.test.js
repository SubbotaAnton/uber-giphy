import React from 'react';
import { shallow } from 'enzyme';
import List from './List';
import styles from "./List.module.css";

it('renders without crashing', () => {
    shallow(<List items={[]} totalCount={100} />);
});

it('renders message about no results', () => {
    const wrapper = shallow(<List items={[]} totalCount={0} />);
    const noResult = <div className={styles.NoResult}>There is no result</div>;
    expect(wrapper.contains(noResult)).toEqual(true);
});

it('do not render when totalCount is undefined', () => {
    const wrapper = shallow(<List items={[]} totalCount={undefined} />);
    expect(wrapper.isEmptyRender()).toEqual(true);
});