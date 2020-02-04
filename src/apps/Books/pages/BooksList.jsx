import React from 'react'
import eventBusService from '../../../services/eventBusService.js';
import booksService from '../services/books-service.js';
import { getUrlParams } from '../../../services/Utils.js';

import BookPreview from '../cmps/BooksList/BookPreview.jsx';
import BooksFilter from '../cmps/BooksList/BooksFilter.jsx';
import BooksAddFromSearch from '../cmps/BooksList/BooksAddFromSearch.jsx';
import PaginationMenu from '../../../cmps/PaginationMenu.jsx';

export default class BooksList extends React.Component {
    state = {
        books: [],
        filterBy: {
            name: '',
            price: 200
        },
        booksPerPage: 10,
        currentPage: 1,
        maxPage: 5
    }

    loadBooks = () => {
        return booksService.getBooks(this.state.filterBy, this.currentPaginationSettings)
            .then(result => this.setState(() => ({ ...result })));
    }

    get currentPaginationSettings() {
        return {
            currentPage: parseInt(getUrlParams('page', this.props.location.search)),
            booksPerPage: this.state.booksPerPage
        };
    }

    onFilter = (filter) => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, ...filter } }), this.loadBooks);
    }

    handleSearch = (searchStr) => {
        this.onFilter({ name: searchStr })
    }

    componentDidMount = () => {
        this.loadBooks().then(() => eventBusService.emit('setSearchHandler', this.handleSearch));
    }

    componentDidUpdate(prevProps) {
        let prevDisplayPage = getUrlParams('page', prevProps.location.search),
            currDisplayPage = getUrlParams('page', this.props.location.search);
        if (prevDisplayPage !== currDisplayPage) this.loadBooks();
    }

    componentWillUnmount() {
        eventBusService.emit('setSearchHandler', null);
    }

    render() {
        return (
            <div className="books-list-wrapper">
                <section className="book-list-options flex space-between">
                    <PaginationMenu currentPage={ this.state.currentPage } maxPage={ this.state.maxPage } />
                    <BooksAddFromSearch loadBooks={ this.loadBooks } />
                    <BooksFilter onFilter={ this.onFilter } />
                </section>

                <ul className="books-list clean-list">
                    { this.state.books.map((book, index) => <BookPreview book={ book } key={ index } onSelectBook={ this.onSelectBook } />) }
                </ul>
            </div>
        );
    }
}