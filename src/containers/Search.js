import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions'

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Search extends Component {
    constructor( props ) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.textInput = React.createRef();
    }

    handleSearch() {
        const searchText = this.textInput.current.value;
        this.props.dispatch(fetchMovies(searchText));
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

export default connect()(Search)