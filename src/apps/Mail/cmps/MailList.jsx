import React from 'react'

import eventBusService from '../../../services/eventBusService.js';
import { getUrlParams } from '../../../services/Utils.js';
import mailService from '../services/mailService.js';
import MailListSortingMenu from './MailList/MailListSortingMenu.jsx';
import PaginationMenu from '../../../cmps/PaginationMenu.jsx';
import MailPreview from './MailList/MailPreview.jsx';
import NewMailForm from './NewMailForm.jsx';
import MultSelectOptionsBox from './MailList/MultSelectBox.jsx';

export default class MailList extends React.Component {
    state = {
        mails: [],
        currentPage: 1,
        maxPage: 1,
        mailsPerPage: 10,
        removeNewMailEventListener: null,
        expandedMailId: null,
        sortBy: { field: 'sentAt', prefix: 1 },
        searchString: null,
        selectedMails: []
    };

    get currentMailsFilter() {
        switch (this.props.match.params['filterName']) {
            case 'important':
                return { name: 'isImportant', value: true };
            case 'trash':
                return { name: 'isDeleted', value: true };
            case 'all':
                return { name: 'all', value: true };
            default:
                return null;
        }
    }

    get currentPaginationSettings() {
        return {
            currentPage: parseInt(getUrlParams('page', this.props.location.search)),
            mailsPerPage: this.state.mailsPerPage
        };
    }

    onSelectMail = () => {
        let elSelectedMails = Array.from(document.querySelectorAll('input.mail-select-box:checked'));
        let selectedMails = elSelectedMails.map(elCheckedBox => elCheckedBox.value);
        this.setState({ selectedMails });
    }

    onMarkSelectedAs = (event) => {
        let selection = event.target.value.split(',');
        let multUpdates = {
            items: this.state.selectedMails,
            field: selection[0],
            value: selection[1] === 'true' ? true : false
        };

        mailService.updateMultiple(multUpdates).then(this.loadMails);
    }

    loadMails = () => {
        let filter = this.currentMailsFilter,
            sortOrder = this.state.sortBy,
            searchString = this.state.searchString,
            paginationSettings = this.currentPaginationSettings;

        return mailService.getMailsToRender(filter, sortOrder, searchString, paginationSettings)
            .then(mailsToRender => this.setState({ ...mailsToRender }));
    }

    toggleMailExpansion = (mailId) => {
        this.setState((prevState) => ({ expandedMailId: (prevState.expandedMailId === mailId ? null : mailId) }));
    }

    sortBy = (updatedField) => {
        return this.setState((prevState) => ({ sortBy: { ...prevState.sortBy, ...updatedField } })
            , this.loadMails);
    }

    handleSearch = (searchString) => {
        this.setState({ searchString }, this.loadMails);
    }

    componentDidMount() {
        this.loadMails().then(() => eventBusService.emit('setSearchHandler', this.handleSearch));
        this.setState(() => ({
            removeNewMailEventListener: eventBusService.on('mailAdd', () => {
                this.loadMails();
                eventBusService.emit('mailStateChanged');
            })
        }));

        if (this.props.match.params.actionType === 'sendNote') eventBusService.callModal('regularModal', { component: NewMailForm, sourceType: 'note' });
    }

    componentDidUpdate(prevProps) {
        let prevDisplayFilter = prevProps.match.params.filterName,
            currDisplayFilter = this.props.match.params.filterName,
            prevDisplayPage = getUrlParams('page', prevProps.location.search),
            currDisplayPage = getUrlParams('page', this.props.location.search);
        if (prevDisplayFilter !== currDisplayFilter || prevDisplayPage !== currDisplayPage) this.loadMails();
    }

    componentWillUnmount() {
        if (this.state.removeNewMailEventListener) this.state.removeNewMailEventListener();
        eventBusService.emit('setSearchHandler', null);
    }


    render() {
        return (
            <React.Fragment>
                <div className="flex align-center space-between mail-list-options">
                    <MailListSortingMenu sortBy={ this.sortBy } currSort={ this.state.sortBy } />
                    <PaginationMenu history={ this.props.history } currentPage={ this.state.currentPage } maxPage={ this.state.maxPage } />
                </div>
                <ul className={ 'clean-list mails-list' + (this.state.mails.length < 1 ? ' no-content' : '') }>
                    { this.state.mails.map((mail, idx) =>
                        <MailPreview toggleMailExpansion={ this.toggleMailExpansion } isExpanded={ this.state.expandedMailId === mail.id }
                            mail={ mail } key={ idx } history={ this.props.history } currFilter={ this.getCurrentMailsFilter } reloadMails={ this.loadMails } onSelectMail={ this.onSelectMail } />) }
                </ul>
                <MultSelectOptionsBox onOptionSelect={ this.onMarkSelectedAs } isVisible={ this.state.selectedMails.length ? true : false } />
            </React.Fragment>);
    }
}