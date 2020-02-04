import React from 'react'
export default class RatingComponenet extends React.Component {

    state = {
        ratingSelected: 0
    }

    setRating = (event) => {
        let ratingSelected = +event.target.dataset.value;
        this.setState(() => ({ ratingSelected }), () => this.props.onUpdateRating(this.state.ratingSelected));
    }

    getRatingButtons = () => {
        let buttons = [];
        for (let i = 1; i <= 5; i++) {
            buttons.push(
                <span key={ i } data-value={ i } onClick={ this.setRating }
                    className={ i <= this.state.ratingSelected ? 'active' : '' }>★</span>);
        }
        return buttons;
    }
    render() {
        return <div className="rating-btns">{ this.getRatingButtons() }</div>
    }
}