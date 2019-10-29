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
        const { items, isFetching } = this.props;
        return (
            <div style={containerStyle}>
                {isFetching ?
                    <h2>Loading...</h2> :
                    <Movies items={items}/>
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
    const { itemsBySearch: { items, isFetching } } = state;

    return {
        items,
        isFetching
    }
}

export default connect(mapStateToProps)(Grid)