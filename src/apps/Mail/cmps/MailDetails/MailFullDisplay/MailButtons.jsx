import React from 'react'
import mailService from '../../../services/mailService.js';
import eventBusService from '../../../../../services/eventBusService.js';

export default class MailButtons extends React.Component {
    onUpdateMail = (updates) => {
        return mailService.updateMailById(this.props.mail.id, updates).then(this.props.reloadMail);
    }

    onDeleteMail = (event) => {
        event.stopPropagation();
        eventBusService.callModal('confirmation', { onConfirmAction: this.confirmDeletion, message: 'Are you sure you want to delete this mail permanently?' });
    }

    confirmDeletion = () => {
        eventBusService.callModal('pageLoading', true);
        return mailService.deleteMailById(this.props.mail.id)
            .then(() => {
                eventBusService.callModal('pageLoading', false);
                eventBusService.callModal('updatesBox', { type: 'success', message: 'Mail Deleted Successfully!' });

                return this.props.isFromPreview ? this.props.reloadMail() : window.location.assign(`#/mail/`);
            });
    }

    onShowMailDetails = () => {
        this.props.history.push(`mail/${this.props.mail.id}`);
    }

    onToggleMailRead = (event) => {
        event.stopPropagation();
        let message = 'Marked as ' + (this.props.mail.isRead ? ' not ' : '') + 'Read';
        this.onUpdateMail({ isRead: !this.props.mail.isRead }).then(() => {
            eventBusService.callModal('updatesBox', { type: 'success', message });
            return eventBusService.emit('mailStateChanged')
        });
    }

    onToggleMailInTrash = (event) => {
        event.stopPropagation();
        let message = 'Mail ' + (this.props.mail.isDeleted ? 'removed from Trash' : 'sent to Trash');
        this.onUpdateMail({ isDeleted: !this.props.mail.isDeleted })
            .then(() => {
                eventBusService.callModal('updatesBox', { type: 'success', message });
                return eventBusService.emit('mailStateChanged');
            });
    }

    onToggleMailImportance = (event) => {
        event.stopPropagation();
        let message = 'Marked as ' + (this.props.mail.isImportant ? ' not ' : '') + 'Important';
        this.onUpdateMail({ isImportant: !this.props.mail.isImportant }).then(() => {
            eventBusService.callModal('updatesBox', { type: 'success', message });
            return eventBusService.emit('mailStateChanged')
        });
    }

    goBack = () => {
        return this.props.history.goBack ? this.props.history.goBack() : null;
    }

    render() {
        const { mail } = this.props;
        if (!mail) return <div>error</div>;
        return (
            <React.Fragment>
                <button className="go-back-button simple-button" onClick={ this.goBack }><i className="fas fa-arrow-circle-left"></i></button>
                <div className="mail-buttons-container">
                    <button onClick={ this.props.onReplyToMail }>
                        <i className="fas fa-reply"></i></button>
                    <button onClick={ this.onToggleMailRead }>
                        <i className={ this.props.mail.isRead ? 'fas fa-book-open' : 'fas fa-book' }></i></button>
                    <button onClick={ this.onToggleMailImportance } className="perm">
                        <i className={ this.props.mail.isImportant ? 'fas fa-star active' : 'far fa-star' }></i></button>
                    <button onClick={ this.onToggleMailInTrash } className="perm">
                        <i className={ this.props.mail.isDeleted ? 'fas fa-recycle' : 'fas fa-trash' }></i></button>

                    { this.props.mail.isDeleted ? <button onClick={ this.onDeleteMail }><i className="fas fa-dumpster"></i></button> : '' }
                    { this.props.isFromPreview ? <button onClick={ this.onShowMailDetails } className="perm"><i className="fas fa-expand-arrows-alt"></i></button> : '' }
                </div>
            </React.Fragment>
        );
    }
}