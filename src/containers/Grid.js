import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Movies from '../components/Movies'

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Grid extends Component {
    render() {
        const { posts, isFetching, error } = this.props
        return (
            <div style={containerStyle}>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {posts.length > 0 &&
                <div>
                    <Movies items={posts}/>
                </div>}
            </div>
        )
    }
}

Grid.propTypes = {
    error: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
    const { postsBySearch, error } = state
    const {
        isFetching,
        items: posts
    } = postsBySearch || {
        error: '',
        isFetching: false,
        items: []
    }
    return {
        error,
        posts,
        isFetching
    }
}

export default connect(mapStateToProps)(Grid)