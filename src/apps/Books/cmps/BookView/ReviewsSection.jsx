import React from 'react'
import eventBusService from '../../../../services/eventBusService.js';
import BookReviewsList from './ReviewsSection/BookReviewsList.jsx';
import ReviewForm from './ReviewsSection/ReviewForm.jsx'

export default class ReviewsSection extends React.Component {
    showReviewModal = () => {
        eventBusService.callModal('regularModal', { component: ReviewForm, onReviewAdd: this.props.onReviewAdd });
    }

    render() {
        return (
            <section className="reviews-section">
                <div className="reviews-head text-center">Latest Reviews</div>
                <BookReviewsList reviewsData={ this.props.reviewsData } />
                <button onClick={ this.showReviewModal } className="review-form-button">Add Review</button>
            </section>
        );
    }

}