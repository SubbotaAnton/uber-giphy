import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from '../../components/List/List'
import { updateItems } from "../../actions/actions";
import InfiniteScroll from 'react-infinite-scroller';
import styles from './Grid.module.css';
import Loading from "../../components/Loading/Loading";

export class Grid extends Component {
    constructor( props ) {
        super(props);
        this.handleContinueSearch = this.handleContinueSearch.bind(this);
    }

    handleContinueSearch() {
        this.props.dispatch(updateItems());
    }

    render() {
        const { items, pagination: { total_count : totalCount }, isFetching, completed } = this.props;
        return (
            <div className={styles.Container}>
                {isFetching ?
                    <Loading/> :
                    typeof totalCount !== 'undefined' &&
                        <InfiniteScroll hasMore={!completed} initialLoad={false} loadMore={this.handleContinueSearch}>
                            <List items={items} totalCount={totalCount}/>
                        </InfiniteScroll>
                }
            </div>
        )
    }
}

Grid.propTypes = {
    items: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
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