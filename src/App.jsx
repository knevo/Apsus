import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './assets/css/main.css';

import Landing from './pages/Landing';
import About from './pages/About';
import NotFound from './pages/NotFound';
import BooksApp from './apps/Books/BooksApp';
import KeepApp from './apps/Keep/KeepApp';
import MailApp from './apps/Mail/MailApp';
import Navbar from './cmps/Navbar';
import Modal from './cmps/Modal';

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Modal />
                <Navbar />
                <main>
                    <Switch>
                        <Route component={KeepApp} path="/keep" exact></Route>
                        <Route component={BooksApp} path="/books"></Route>
                        <Route component={MailApp} path="/mail"></Route>
                        <Route component={About} path="/about" exact></Route>
                        <Route component={Landing} path="/" exact></Route>
                        <Route component={NotFound} path="/"></Route>
                    </Switch>
                </main>
            </Router>
        )
    }
}

export default App;
