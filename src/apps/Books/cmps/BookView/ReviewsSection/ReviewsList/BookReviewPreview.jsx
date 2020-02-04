import React from 'react'
export default class BookReviewPreview extends React.Component {

    getRateString = () => {
        let str = '';
        for (let i = 0; i < this.props.reviewData.rate; i++) {
            str += '★';
        }
        return str;
    }

    getDateString = () => {
        let date = this.props.reviewData.readDate.split('-').reverse().join('-');
        return date;
    }

    render() {
        const { reviewData } = this.props;
        return (
            <li>
                <div className="review-header flex space-between">
                    <span>{ reviewData.fullName } ({ this.getRateString() })</span>
                    <span>Read Date: { this.getDateString() }</span>
                </div>
                <p>
                    { reviewData.text }
                </p>
            </li>);
    }
}