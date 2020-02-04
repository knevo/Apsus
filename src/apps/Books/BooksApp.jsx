// Router
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import BooksList from './pages/BooksList.jsx';
import BookView from './pages/BookView.jsx';

export default class BooksApp extends React.Component {
    render() {
        return (
            <div className="book-app-wrapper">
                <Router history={ this.props.history }>
                    <Switch>
                        <Route component={ BookView } path="/books/:id" exact />
                        <Route component={ BooksList } path="/books" exact />
                    </Switch>
                </Router>
            </div>
        )
    }
}
