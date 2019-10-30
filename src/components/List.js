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
                {items.map(( post ) => {
                    const { title, id, images: { fixed_width_still: { url } } } = post;
                    return <Item key={id} title={title} url={url}/>
                })}
            </ul>
        )
    }
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    totalCount: PropTypes.number
};