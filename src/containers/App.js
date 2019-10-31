import React, { Component, Fragment } from 'react'
import Search from './Search/Search'
import Grid from "./Grid/Grid";

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Search/>
                <Grid/>
            </Fragment>
        )
    }
}