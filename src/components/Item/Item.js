import React from 'react'
import styles from './Item.module.css';
import PropTypes from "prop-types";

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

Item.propTypes = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Item;
