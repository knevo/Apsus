import React from 'react'
import { formatTsToInput } from '../../../../../services/Utils.js';
import RatingComponent from './ReviewForm/RatingComponent.jsx';

export default class ReviewForm extends React.Component {

    state = {
        formData: {
            fullName: '',
            text: '',
            rate: '',
            readDate: formatTsToInput(Date.now())
        },
        animationClass: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { formData } = this.state;
        if (!formData.text || !formData.rate || !formData.readDate) return;

        let reviewData = { ...formData, fullName: (formData.fullName ? formData.fullName : 'Book Reader') }
        this.props.transData.onReviewAdd(reviewData);
        this.props.onModalClose();
    }

    handleChange = (event) => {
        let field = event.target.name,
            value = field === 'rate' ? +event.target.value : event.target.value;
        this.setState((prevState) => ({ formData: { ...prevState.formData, [field]: value } }));
    }

    onUpdateRating = (rating) => {
        this.setState((prevState) => ({ formData: { ...prevState.formData, rate: rating } }));
    }

    componentDidMount = () => {
        this.fullNameInputRef.current.focus();
    }

    constructor(props) {
        super(props);
        this.fullNameInputRef = React.createRef();
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit } className="book-review-add-form">
                <div className="book-review-add-form-title">Add new Review</div>
                <RatingComponent onUpdateRating={ this.onUpdateRating } />
                <input type="button" value="&times;" onClick={ this.props.onModalClose } className="simple-button dismiss" />
                <div className="review-form-upper-elements flex space-between">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input ref={ this.fullNameInputRef } type="text" id="fullName" name="fullName" placeholder="Benel Tavori" value={ this.state.formData.fullName } onChange={ this.handleChange } />
                    </div>

                    <div className="form-group">
                        <label htmlFor="readDate">Read Date:</label>
                        <input type="date" id="readDate" name="readDate" value={ this.state.formData.readDate } onChange={ this.handleChange } />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Your Review:</label>
                    <textarea name="text" id="text" placeholder="E.g: Awesome Book!.." defaultValue={ this.state.formData.text } onChange={ this.handleChange } required></textarea>
                </div>


                <button className="review-form-button">Submit Review</button>
            </form >);
    }
}
