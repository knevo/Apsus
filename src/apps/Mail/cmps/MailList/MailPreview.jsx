import React from 'react'
import { getFormattedTimeString, sliceStringByLength } from '../../../../services/Utils.js';
import MailFullDisplay from '../MailDetails/MailFullDisplay.jsx';


export default class MailPreview extends React.Component {

    state = {
        isSelected: false
    }

    get formattedMailSubject() {
        return sliceStringByLength(this.props.mail.subject, 30);
    }

    get formattedMailBody() {
        return sliceStringByLength(this.props.mail.body, 200);
    }

    get formattedMailSender() {
        return this.props.mail.sender.split('@')[0];
    }

    get formattedSentDate() {
        return getFormattedTimeString(this.props.mail.sentAt);
    }

    toggleExpansion = () => {
        this.props.toggleMailExpansion(this.props.mail.id);
    }

    onToggleSelection = (event) => {
        event.stopPropagation();
        this.setState(prevState => ({ isSelected: !prevState.isSelected }));
        this.props.onSelectMail();
    }

    render() {
        const { mail } = this.props;
        return (
            <li onClick={ this.toggleExpansion } className={ this.state.isSelected ? 'selected' : '' }>
                <div className="mail-preview">
                    <div className="sender-icon flex">{ this.formattedMailSender.slice(0, 1) }</div>
                    <div className="preview-text-wrapper">
                        <span className="mail-multi-selector">
                            <input type="checkbox" className="mail-select-box" value={ mail.id } onClick={ this.onToggleSelection } checked={ this.isSelected } />
                        </span>
                        <span className="mail-sender">{ this.formattedMailSender }</span>
                        <span className="mail-subject">
                            <div className={ mail.isRead ? '' : 'bolded' }>{ this.formattedMailSubject }</div>
                            { this.formattedMailBody }
                        </span>
                        <span className="mail-date">{ this.formattedSentDate }</span>
                    </div>
                </div>
                { this.props.isExpanded ? <MailFullDisplay history={ this.props.history } mail={ mail } reloadMail={ this.props.reloadMails } isFromPreview={ true } /> : '' }
            </li>);
    }
}