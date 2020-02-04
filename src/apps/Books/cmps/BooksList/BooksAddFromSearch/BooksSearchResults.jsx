import React from 'react'
export default class BooksSearchResults extends React.Component {
    state = {
    };

    getResultPreview(googleBookObj, keyIdx) {
        return (
            <li key={ keyIdx }>
                <span>{ googleBookObj.volumeInfo.title }</span>
                <span><button className="add-book-button" onClick={ () => this.props.onSelectBook(googleBookObj) }>+</button></span>
            </li>);
    }

    render() {
        return (
            <ul className="clean-list search-results">
                { this.props.searchResults ? this.props.searchResults.map((googleBookObj, idx) => this.getResultPreview(googleBookObj, idx)) : '' }
            </ul>
        );
    }
}