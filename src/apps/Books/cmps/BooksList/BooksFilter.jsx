import React from 'react'
export default class BooksFilter extends React.Component {

    state = {
        filterBy: {
            price: 200
        },
        boxDisplayed: false
    };

    toggleFilter = () => {
        this.setState((prevState) => ({ boxDisplayed: !prevState.boxDisplayed }));
    }

    handleInput = (event) => {
        this.setState({ filterBy: { price: +event.target.value } },
            () => this.props.onFilter(this.state.filterBy));
    }

    render() {
        return (
            <React.Fragment>
                <button className="simple-button" onClick={ this.toggleFilter }><i className="fas fa-funnel-dollar"></i></button>
                <div className={ 'price-filter-box-wrapper' + (this.state.boxDisplayed ? ' active' : '') }>
                    <span className="current-price-range-display">{ this.state.filterBy.price }</span>
                    <input type="range" name="price" step="1" min="1" max="200" value={ this.state.filterBy.price } onChange={ this.handleInput } />
                </div>
            </React.Fragment>);
    }
}