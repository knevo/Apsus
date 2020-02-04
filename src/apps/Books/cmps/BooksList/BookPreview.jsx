import React from 'react'
import { Link } from 'react-router-dom'
import booksService from '../../services/books-service.js';
export default class BookPreview extends React.Component {

    render() {
        const { book } = this.props;
        return (
            <li className="books-list-card">
                <Link to={ `/books/${book.id}` } className="flex column">
                    <img alt='book' src={ book.thumbnail } />
                    <span className="book-name">{ book.title }</span>
                    <small className="price">{ booksService.getPriceString(book.listPrice.amount, book.listPrice.currencyCode) }</small>
                </Link>
            </li>);
    }
}