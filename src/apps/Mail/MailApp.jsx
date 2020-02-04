// Router
import React from 'react'
import { Route, Switch, Router } from 'react-router-dom'


import MailDetails from './cmps/MailDetails.jsx';
import MailList from './cmps/MailList.jsx';
import MailSideNav from './cmps/MailSideNav.jsx';

export default class MailApp extends React.Component {
    render() {
        return (
            <Router history={ this.props.history }>
                <div className="mail-main-wrapper">
                    <MailSideNav />
                    <section className="mail-main-content">
                        <Switch>
                            <Route path="/mail/filter/:filterName" exact component={ MailList } />
                            <Route path="/mail/action/:actionType" exact component={ MailList } />
                            <Route path="/mail/:id" exact component={ MailDetails } />
                            <Route path="/mail" exact component={ MailList } />
                        </Switch>
                    </section>
                </div>
            </Router>
        )
    }
}
