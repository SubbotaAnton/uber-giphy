import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems, updateItems } from '../actions'

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Search extends Component {
    constructor( props ) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleContinueSearch = this.handleContinueSearch.bind(this);
        this.textInput = React.createRef();
    }

    handleSearch() {
        const searchText = this.textInput.current.value;
        this.props.dispatch(loadItems(searchText));
    }

    handleContinueSearch() {
        const searchText = this.textInput.current.value;
        this.props.dispatch(updateItems(searchText));
    }

    render() {
        return (
            <div style={containerStyle}>
                <input type="text" ref={this.textInput} placeholder="Type here to search"/>
                <button onClick={this.handleSearch}>Search</button>
                <button onClick={this.handleContinueSearch}>Continue search</button>
            </div>
        )
    }
}

export default connect()(Search)