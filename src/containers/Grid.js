import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    fetchMoviesIfNeeded,
} from '../actions'
import Movies from '../components/Movies'

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Grid extends Component {
    componentDidUpdate(prevProps) {
        // also possible to do this check directly in container
        if (this.props.selectedSearch !== prevProps.selectedSearch) {
            const {dispatch, selectedSearch} = this.props
            dispatch(fetchMoviesIfNeeded(selectedSearch))
        }
    }


    render() {
        const {posts, isFetching, error} = this.props
        return (
            <div style={containerStyle}>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {posts.length > 0 &&
                <div>
                    <Movies posts={posts}/>
                </div>}
            </div>
        )
    }
}

Grid.propTypes = {
    selectedSearch: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {selectedSearch, postsBySearch, error} = state
    const {
        isFetching,
        items: posts
    } = postsBySearch[selectedSearch] || {
        error: '',
        isFetching: false,
        items: []
    }
    return {
        selectedSearch,
        error,
        posts,
        isFetching
    }
}

export default connect(mapStateToProps)(Grid)