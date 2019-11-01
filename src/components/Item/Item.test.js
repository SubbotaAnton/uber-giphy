import React from 'react';
import { shallow } from 'enzyme';
import Item from './Item';
import { item1 } from "./mocks/items";
import styles from "./Item.module.css";

describe('<Item />', () => {
    const { url: src, images: { original: { url }}} = item1;

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Item src={src} url={url}/>);
    });

    it('check render', () => {
        const render =
            <li className={styles.Item}>
                <a href={src} target="_blank" rel="noopener noreferrer">
                    <img src={url} alt="" className={styles.Image}/>
                </a>
            </li>;
        expect(wrapper.contains(render)).toEqual(true);
    });

});