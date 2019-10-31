import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from '../components/List'
import { updateItems } from "../actions";
import InfiniteScroll from 'react-infinite-scroller';

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
        const { items, pagination: { total_count }, isFetching, completed } = this.props;
        return (
            <div style={containerStyle}>
                {isFetching ?
                    <h2>Loading...</h2> :
                    // I did use InfiniteScroll plugin because:
                    // 1) in real life best practice is use ready-to-use plugins,
                    // especially in case they are lightweight and are good match
                    // 2) I checked code of this plugin, it's pretty easy, so I can reproduce this code here in
                    // the project, but I think it wasn't required
                    <InfiniteScroll hasMore={!completed} initialLoad={false} loadMore={this.handleContinueSearch}>
                        <List items={items} totalCount={total_count}/>
                    </InfiniteScroll>
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