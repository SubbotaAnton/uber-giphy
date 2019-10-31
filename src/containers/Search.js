import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadItems, updateSearch } from '../actions'
import PropTypes from "prop-types";

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Search extends Component {
    constructor( props ) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.textInput = React.createRef();
    }

    handleSearch() {
        const searchText = this.textInput.current.value;
        this.props.dispatch(loadItems(searchText));
    }

    onChange(e) {
        this.props.dispatch(updateSearch(e.target.value));
    }

    render() {
        return (
            <div style={containerStyle}>
                <input type="text" ref={this.textInput} value={this.props.value} onChange={this.onChange} placeholder="Type here to search"/>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        )
    }
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
    const { search: { value } } = state;

    return {
        value
    }
}

export default connect(mapStateToProps)(Search)