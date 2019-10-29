import React, { Component, Fragment } from 'react'
import Search from './Search'
import Grid from "./Grid";

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Search/>
                <Grid />
            </Fragment>
        )
    }
}