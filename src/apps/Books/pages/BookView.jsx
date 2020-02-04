import React from 'react'
import booksService from '../services/books-service.js';

import GoBackButton from '../../../cmps//GoBackButton.jsx';
import BookBadges from '../cmps/BookView/BookBadges.jsx';
import LongTxt from '../../../cmps/LongTxt.jsx';
import ReviewsSection from '../cmps/BookView/ReviewsSection.jsx';

export default class BookView extends React.Component {
    state = {
        book: null,
        status: 'Loading...'
    }

    loadBook = () => {
        const { id } = this.props.match.params;
        booksService.getBookById(id).then(book => {
            book ? this.setState({ book }) : this.setState({ book, status: 'Could not find book' });
        })
    }

    onDelete = () => {
        booksService.deleteBookById(this.state.book.id).then(() => {
            this.onReturn();
        });
    }

    onReviewAdd = (review) => {
        let updatedReviews = this.state.book.reviews.slice();
        updatedReviews.push(review);
        booksService.editBookById(this.state.book.id, { reviews: updatedReviews })
            .then(() => this.loadBook());
    }

    onReturn = () => {
        this.props.history.push('./');
    }

    getBookPrice = () => {
        return booksService.getPriceString(this.state.book.listPrice.amount, this.state.book.listPrice.currencyCode);
    }

    getColorClassByPrice = () => {
        return this.state.book.listPrice.amount <= 20 ? 'cheap' : 'expensive';
    }

    componentDidMount = () => {
        this.loadBook();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id
            !== this.props.match.params.id) {
            this.loadBook();
        }
    }

    render() {
        const { book } = this.state;
        if (!book) return <div className="loading">{ this.state.status }</div>;
        return (
            <div className="book-display">
                <GoBackButton onReturn={ this.onReturn } />
                <section className="information">
                    <h2 className="title">{ book.title }</h2>
                    <ul className="more-info-list">
                        <li>Categories: { book.categories ? book.categories.join(',') : 'N/A' }</li>
                        <li>Subtitle: { book.subtitle }</li>
                        <li>Authors: { book.authors.join(',') }</li>
                        <li>Publish Year: { book.publishedDate }</li>
                        <li>Pages Count: { book.pageCount }</li>
                        <li>Language: { book.language.toUpperCase() }</li>
                        <li>Description:
                            <LongTxt bookDescription={ book.description } strLength={ 150 } />
                        </li>
                    </ul>
                </section>
                <section className="cover">
                    <div className="cover-wrapper">
                        { book.listPrice.isOnSale ? <span className="on-sale">on sale!</span> : '' }
                        <img alt='' src={ book.thumbnail } />
                        <BookBadges pageCount={ book.pageCount } publishDate={ book.publishedDate } />
                    </div>
                    <span className={ `price ${this.getColorClassByPrice()}` }>{ this.getBookPrice() }</span>
                </section>
                <ReviewsSection reviewsData={ book.reviews } onReviewAdd={ this.onReviewAdd } />
            </div>);
    }
}