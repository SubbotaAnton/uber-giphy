import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from '../components/List'

const containerStyle = {
    padding: '20px',
    margin: '20px'
};

class Grid extends Component {
    render() {
        const { items, pagination: { total_count }, isFetching } = this.props;
        return (
            <div style={containerStyle}>
                {isFetching ?
                    <h2>Loading...</h2> :
                    <List items={items} totalCount={total_count}/>
                }
            </div>
        )
    }
}

Grid.propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
    const { items: { data: { items, pagination }, isFetching } } = state;

    return {
        items,
        pagination,
        isFetching
    }
}

export default connect(mapStateToProps)(Grid)