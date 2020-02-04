import React from 'react'
import eventBusService from '../../services/eventBusService.js';

export default class SearchBox extends React.Component {

    state = {
        currentSearchHandler: null,
        searchString: ''
    }

    handleSearchInput = (event) => {
        let searchString = event.target.value;
        this.setState({ searchString }, () => this.state.currentSearchHandler(this.state.searchString));
    }

    setCurrentSearchHandler = (searchHandler) => {
        this.setState({ currentSearchHandler: searchHandler });
    }

    componentDidMount() {
        eventBusService.on('setSearchHandler', this.setCurrentSearchHandler);
    }

    render() {
        return !this.state.currentSearchHandler ? '' :
            (<div className="main-search-box">
                <input type="search" className="normal-trans" onChange={ this.handleSearchInput } value={ this.state.searchString } placeholder="Search here!" />
            </div>);
    }
}