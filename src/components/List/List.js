import React from 'react'
import PropTypes from 'prop-types'
import Item from '../Item/Item'
import styles from './List.module.css'

function List (props) {
    const { items } = props;

    if (items.length === 0) {
        return (
            <div className={styles.NoResult}>There is no result</div>
        )
    }

    return (
        <ul className={styles.List}>
            {items.map(( post, index ) => {
                const { url: src, images: { original: { url } } } = post;
                // TODO better to use unique id here,
                // but for some reason sometimes there are duplicates for that unique id
                // so until we drag-and-drop that elements it's good enough to use index
                return <Item key={index} src={src} url={url}/>
            })}
        </ul>
    )

}

List.propTypes = {
    items: PropTypes.array.isRequired
};

export default List;