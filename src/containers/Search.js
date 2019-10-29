import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    selectSearch,
    fetchMoviesIfNeeded,
    clearError
} from '../actions'

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Search extends Component {
    constructor( props ) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.textInput = React.createRef()
    }

    componentDidMount() {
        const { selectedSearch } = this.props
        this.textInput.current.value = selectedSearch;
    }

    componentDidUpdate( prevProps ) {
        // also possible to do this check directly in container
        if (this.props.selectedSearch !== prevProps.selectedSearch) {
            const { dispatch, selectedSearch } = this.props
            dispatch(fetchMoviesIfNeeded(selectedSearch))
        }
    }

    handleSearch() {
        const searchText = this.textInput.current.value
        this.props.dispatch(clearError())
        this.props.dispatch(selectSearch(searchText))
        this.props.dispatch(fetchMoviesIfNeeded(searchText))
    }

    render() {
        return (
            <div style={containerStyle}>
                <input type="text" ref={this.textInput} placeholder="Type here to search"/>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        )
    }
}

Search.propTypes = {
    selectedSearch: PropTypes.string.isRequired,
}

function mapStateToProps( state ) {
    const { selectedSearch } = state
    return {
        selectedSearch
    }
}

export default connect(mapStateToProps)(Search)