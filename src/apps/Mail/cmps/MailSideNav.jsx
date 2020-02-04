import React from 'react'
import { NavLink } from 'react-router-dom'

import mailService from '../services/mailService.js';
import eventBusService from '../../../services/eventBusService.js';
import NewMailForm from './NewMailForm.jsx';
import MailReadProgress from './MailSideNav/MailReadProgress.jsx';



export default class MailSideNav extends React.Component {
    state = {
        unreadCounters: { inbox: 0, important: 0, trash: 0, readPercentage: 0 },
        removeMailReadEventListener: null
    }

    onNewMailFormToggle = () => {
        eventBusService.callModal('regularModal', { component: NewMailForm });
    }

    displayUnread = (itemsType) => {
        return this.state.unreadCounters[itemsType] ? ` (${this.state.unreadCounters[itemsType]})` : '';
    }

    getUnreadCounter = () => {
        mailService.getUnreadMailsCounter().then(result => this.setState(() => ({ unreadCounters: result })));
    }

    componentDidMount() {
        this.getUnreadCounter();
        this.setState(() => ({ removeMailReadEventListener: eventBusService.on('mailStateChanged', this.getUnreadCounter) }));
    }

    componentWillUnmount() {
        this.state.removeMailReadEventListener && this.state.removeMailReadEventListener();
    }

    render() {
        return (
            <nav className="mails-side-nav">
                <button onClick={ this.onNewMailFormToggle } className="new-mail-btn">Compose <span>+</span></button>
                <ul className="clean-list flex column main-sidenav-list">
                    <li><NavLink activeClassName="active" to='/mail/filter/all'><i className="fas fa-mail-bulk"></i>All Mails</NavLink></li>
                    <li><NavLink activeClassName="active" to='/mail' exact><i className="fas fa-inbox"></i>Inbox{ this.displayUnread('inbox') }</NavLink></li>
                    <li><NavLink activeClassName="active" to='/mail/filter/sent'><i className="far fa-paper-plane"></i>Sent Items</NavLink></li>
                    <li><NavLink activeClassName="active" to='/mail/filter/important'><i className="far fa-bookmark"></i>Important{ this.displayUnread('important') }</NavLink></li>
                    <li><NavLink activeClassName="active" to='/mail/filter/trash'><i className="fas fa-trash"></i>Trash{ this.displayUnread('trash') }</NavLink></li>
                </ul>
                <MailReadProgress readPercentage={ this.state.unreadCounters.readPercentage } />
            </nav>);
    }
}