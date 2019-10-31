import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyleType: 'none',
    justifyContent: 'space-between',
    flexDirection: 'column'
};


export default class List extends Component {
    render() {
        const { items, totalCount } = this.props;
        if (typeof totalCount === 'undefined') {
            return null;
        }

        if (totalCount === 0) {
            return (
                <div>There is no result</div>
            )
        }

        return (
            <ul style={listStyle}>
                {items.map(( post, index ) => {
                    const { title, images: { fixed_width_still: { url } } } = post;
                    // TODO better to use unique id here,
                    // but for some reason sometimes there are duplicates for that unique id
                    // so until we drag-and-drop that elements it's good enough to use index
                    return <Item key={index} title={title} url={url}/>
                })}
            </ul>
        )
    }
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    totalCount: PropTypes.number
};