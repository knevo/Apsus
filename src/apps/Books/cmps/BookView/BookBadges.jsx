import React from 'react'
export default function BookBadges(props) {
    let lengthBadge = (props.pageCount > 500 ? 'Long' : props.pageCount > 200 ? 'Decent' : 'Light') + ' Reading',
        bookAge = (new Date().getFullYear() - props.publishDate) > 10 ? 'Veteran Book' : 'New Book!';
    return (
        <ul className="badges clean-list flex justify-center">
            <li>{ lengthBadge }</li>
            <li>{ bookAge }</li>
        </ul>);
}