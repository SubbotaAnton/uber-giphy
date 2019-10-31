import React from 'react'
import styles from './Item.module.css';

function Item( props ) {
    const { src, url } = props;

    return (
        <li className={styles.Item}>
            <a href={src} target="_blank" rel="noopener noreferrer">
                <img src={url} alt="" className={styles.Image}/>
            </a>
        </li>
    )
}

export default Item;
