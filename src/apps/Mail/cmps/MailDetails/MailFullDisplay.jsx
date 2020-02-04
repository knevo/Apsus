import React from 'react'
import eventBusService from '../../../../services/eventBusService.js';
import { sliceStringByLength } from '../../../../services/Utils.js';
import mailService from '../../services/mailService.js';
import MailButtons from './MailFullDisplay/MailButtons.jsx';

import NewMailForm from '../NewMailForm.jsx';

export default class MailFullDisplay extends React.Component {

    state = {
        isFromPreview: false
    }

    onReplyToMail = (event) => {
        event.stopPropagation();
        eventBusService.callModal('regularModal', { component: NewMailForm, mailToQuote: this.props.mail, sourceType: 'quote' });
    }

    get formattedBodyText() {
        return this.state.isFromPreview ? sliceStringByLength(this.props.mail.body, 210) : this.props.mail.body;
    }

    get formattedMailSender() {
        return this.props.mail.sender.split('@')[0];
    }

    componentDidMount = () => {
        if (this.props.isFromPreview) return this.setState(() => ({ isFromPreview: true }));

        if (!this.props.mail.isRead) {
            mailService.updateMailById(this.props.mail.id, { isRead: true }).then(() => {
                if (this.state.isFromPreview) this.props.reloadMail();
                eventBusService.emit('mailStateChanged');
            });
        }
    }

    render() {
        const { mail } = this.props;
        if (!mail) return <div>error</div>;
        return (
            <div className="mail-details">
                <h2>{ mail.subject }</h2>
                <div className="mail-sender"><span className="sender-name">{ this.formattedMailSender }</span> <small>{ '<' + mail.sender + '>' }</small></div>
                <p className="mail-body">{ this.formattedBodyText }</p>
                <MailButtons history={ this.props.history } mail={ this.props.mail } isFromPreview={ this.state.isFromPreview } reloadMail={ this.props.reloadMail } onReplyToMail={ this.onReplyToMail } />
            </div>);
    }
}