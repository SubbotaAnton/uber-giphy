import React from 'react';
import { mount } from 'enzyme';
import { Search } from './Search';
import styles from "./Search.module.css";

describe('<Search />', () => {
    const value = "anyValue";
    const mockDispatch = jest.fn();

    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Search value={value} dispatch={mockDispatch} />);
        mockDispatch.mockReset();
    });

    it('it renders with proper html', () => {
        const render =
            <div className={styles.Container}>
                <input type="text" value={value}
                       placeholder="Type here to search" className={styles.Input}/>
                <button className={styles.Button}/>
            </div>;
        expect(wrapper.containsMatchingElement(render)).toEqual(true);
    });

    it('it handles click on button', () => {
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        wrapper.find('button').simulate('click');
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('it handles changes into input', () => {
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        wrapper.find('input').simulate('change');
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('it handles press ENTER into input', () => {
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        wrapper.find('input').simulate('keypress', {key: 'Enter'});
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

});