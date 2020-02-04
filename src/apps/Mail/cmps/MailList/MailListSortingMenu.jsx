import React from 'react'

export default class MailListSortingMenu extends React.Component {

    onSortBy = (event) => {
        let sortByField = event.target.value;

        let updatedSorting = sortByField === this.props.currSort.field ?
            { prefix: this.props.currSort.prefix * -1 } : { field: sortByField };
        this.props.sortBy(updatedSorting);
    }

    render() {
        return (
            <ul className="clean-list flex mail-list-sorting-menu">
                <li>
                    <input type="radio" id="sort-by-date" name="sort-by" value="sentAt" defaultChecked onClick={ this.onSortBy } />
                    <label htmlFor="sort-by-date">date <i className="fas fa-sort"></i></label>
                </li>
                <li>
                    <input type="radio" id="sort-by-origin" name="sort-by" value="sender" onClick={ this.onSortBy } />
                    <label htmlFor="sort-by-origin">Origin <i className="fas fa-sort"></i></label>
                </li>
                <li>
                    <input type="radio" id="sort-by-unread" name="sort-by" value="isRead" onClick={ this.onSortBy } />
                    <label htmlFor="sort-by-unread">unread <i className="fas fa-sort"></i></label>
                </li>
            </ul>);
    }
}