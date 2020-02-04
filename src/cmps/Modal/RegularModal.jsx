import React from 'react'
export default class RegularModal extends React.Component {
    state = {
        isClosing: false
    }

    onModalClose = (event) => {
        this.setState(() => {
            setTimeout(() => this.props.onModalClose(event), 400);
            return { isClosing: true };
        })
    }

    onKeyUp = (event) => {
        if (event.key === 'Escape') this.onModalClose();
    }

    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp);
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    render() {

        const DynamicComponent = this.props.modalData.component;
        return (
            <div className={ 'modal-wrapper' + (this.state.isClosing ? ' fade-out' : '') } onClick={ this.onModalClose }>
                <div className="modal-content" onClick={ (event) => event.stopPropagation() }>
                    <DynamicComponent onModalClose={ this.onModalClose } transData={ this.props.modalData } />
                </div>
            </div>);
    }
}