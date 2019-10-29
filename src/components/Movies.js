import React, { Component } from 'react'
import PropTypes from 'prop-types'

const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    listStyleType: 'none',
    justifyContent: 'space-between'
};

const itemStyle = {
    margin: '2em',
    padding: '2em',
    background: '#f3f3f3',
    boxShadow: '0 5px 10px rgba(135,135,151,0.14)',
    borderRadius: '5px',
    textAlign: 'center'
};

export default class Movies extends Component {
    render() {
        return (
            <ul style={listStyle}>
                {this.props.posts.map(( post, i ) => {
                    const { title, images: { fixed_height_downsampled: { url } } } = post;
                    return <li key={i} style={itemStyle}>
                        <h2>{title}</h2>
                        <img src={url} alt="" height={200} />
                    </li>
                })}
            </ul>
        )
    }
}

Movies.propTypes = {
    posts: PropTypes.array.isRequired
}