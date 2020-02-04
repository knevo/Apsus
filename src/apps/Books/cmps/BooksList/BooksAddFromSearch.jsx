import React from 'react'
import eventBusService from '../../../../services/eventBusService.js';
import booksService from '../../services/books-service.js';
import BooksSearchResults from './BooksAddFromSearch/BooksSearchResults.jsx';

export default class BooksAddFromSearch extends React.Component {

    state = {
        searchStr: '',
        currentSearchResults: [],
        searchOpen: false
    };

    toggleSearch = () => {
        this.setState((prevState) => ({ searchOpen: !prevState.searchOpen }));
    }

    handleInput = (event) => {
        let inputValue = event.target.value;
        if (!inputValue) return this.setState(() => ({ searchStr: '', currentSearchResults: [] }));
        this.setState(() => ({ searchStr: inputValue }),
            () => booksService.searchBooks(this.state.searchStr)
                .then(searchResults => this.setState(() => ({ currentSearchResults: searchResults }))));
    }

    onSelectBook = (googleBookObj) => {
        booksService.addBookFromGoogle(googleBookObj).then(() => {
            eventBusService.callModal('updatesBox', { type: 'success', message: 'Book Added Successfully' });
            return this.props.loadBooks()
        });
    }

    render() {
        return (
            // <section className="add-new-book">
            <React.Fragment>
                <button className="simple-button" onClick={ this.toggleSearch }>
                    <i className="fas fa-plus"></i> <span className="no-mobile">Add New </span>Book</button>
                <div className={ 'search-box-wrapper auto-center' + (this.state.searchOpen ? ' active' : '') }>
                    <input type="search" onChange={ this.handleInput } value={ this.state.searchStr } placeholder="Search &amp; Add New Book!" />
                    <BooksSearchResults onSelectBook={ this.onSelectBook } searchResults={ this.state.currentSearchResults } />
                </div>
            </React.Fragment >
            // </section>
        );
    }
}