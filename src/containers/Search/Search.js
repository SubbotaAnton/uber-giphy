import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItems, updateSearch } from '../../actions/actions';
import PropTypes from "prop-types";
import styles from './Search.module.css';

class Search extends Component {
    constructor( props ) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.textInput = React.createRef();
    }

    onSearch() {
        const searchText = this.textInput.current.value;
        this.props.dispatch(loadItems(searchText));
    }

    onChange( e ) {
        this.props.dispatch(updateSearch(e.target.value));
    }

    onKeyPressed( e ) {
        if (e.key === "Enter") {
            this.onSearch();
        }
    }

    render() {
        return (
            <div className={styles.Container}>
                {/*
                    good practice to created shared components like Input or Button
                    but we have a limit of time and just one using of these elements
                */}
                <input type="text" ref={this.textInput} value={this.props.value}
                       onChange={this.onChange} onKeyPress={this.onKeyPressed}
                       placeholder="Type here to search" className={styles.Input}/>
                <button onClick={this.onSearch} className={styles.Button}/>
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