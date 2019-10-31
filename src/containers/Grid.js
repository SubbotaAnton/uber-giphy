import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from '../components/List'
import { updateItems } from "../actions";

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Grid extends Component {
    constructor( props ) {
        super(props);
        this.handleContinueSearch = this.handleContinueSearch.bind(this);
    }

    handleContinueSearch() {
        this.props.dispatch(updateItems());
    }

    render() {
        const { items, pagination: { total_count }, isFetching } = this.props;
        return (
            <div style={containerStyle}>
                {isFetching ?
                    <h2>Loading...</h2> :
                    <>
                        <List items={items} totalCount={total_count}/>
                        <button onClick={this.handleContinueSearch}>Continue search</button>
                    </>
                }
            </div>
        )
    }
}

Grid.propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
    const { items: { data: { items, pagination }, isFetching, completed } } = state;

    return {
        items,
        pagination,
        isFetching,
        completed
    }
}

export default connect(mapStateToProps)(Grid)