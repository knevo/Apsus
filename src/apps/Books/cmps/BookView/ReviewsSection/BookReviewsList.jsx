import React from 'react'
import BookReviewPreview from './ReviewsList/BookReviewPreview.jsx';

export default class BookReviewsList extends React.Component {
    render() {
        return (
            <ul className="book-reviews-list clean-list">
                { this.props.reviewsData.length < 1 ? <li className="empty-list-item">No reviews added yet</li> :
                    this.props.reviewsData.map((review, index) => (<BookReviewPreview key={ index } reviewData={ review } />)) }
            </ul>
        )
    }
}