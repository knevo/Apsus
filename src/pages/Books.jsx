// Router
import React from 'react'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


import BookView from '../cmps/Books/BookView.jsx';
import BooksList from '../cmps/Books/BooksList.jsx';

export default class Books extends React.Component {
    render() {
        return (
            <Router history={ this.props.history }>
                <Switch>
                    <Route component={ BookView } path="/books/:id" />
                    <Route component={ BooksList } path="/books" exact />
                </Switch>
            </Router>);
    }
}