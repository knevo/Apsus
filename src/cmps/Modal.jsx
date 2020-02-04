import React from 'react'
import eventBusService from '../services/eventBusService.js';
import UpdatesBox from './Modal/UpdatesBox.jsx';
import RegularModal from './Modal/RegularModal.jsx';
import PageLoading from './Modal/PageLoading.jsx';
import Confirmation from './Modal/Confirmation.jsx';

export default class Modal extends React.Component {
    state = {
        regularModalShown: null,
        pageLoadingShown: null,
        updatesBoxShown: null,
        updatesBoxTimer: null,
        confirmationShown: null
    }

    showModal = (data) => {
        if (data.modalType === 'updatesBox') this.setUpdatesBox();
        return this.setState({ [data.modalType + 'Shown']: data.props });
    }

    setUpdatesBox() {
        if (this.state.updatesBoxTimer) {
            clearTimeout(this.state.updatesBoxTimer);
            this.setState({ updatesBoxTimer: null });
        }
        this.setState({ updatesBoxTimer: setTimeout(() => this.hideModal('updatesBox'), 2500) });
    }

    hideModal = (modalType) => {
        this.setState({ [modalType + 'Shown']: null });
    }

    componentDidMount() {
        eventBusService.on('callModal', this.showModal);
    }

    render() {
        return (
            <React.Fragment>
                { this.state.confirmationShown ? <RegularModal modalData={ { component: Confirmation, ...this.state.confirmationShown } } onModalClose={ () => this.hideModal('confirmation') } /> : '' }
                { this.state.pageLoadingShown ? <PageLoading /> : '' }
                { this.state.regularModalShown ? <RegularModal modalData={ this.state.regularModalShown } onModalClose={ () => this.hideModal('regularModal') } /> : '' }
                { this.state.updatesBoxShown && this.state.updatesBoxTimer ? <UpdatesBox modalData={ this.state.updatesBoxShown } /> : '' }
            </React.Fragment>);
    }
}