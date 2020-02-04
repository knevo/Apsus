import React from 'react'
import mailService from '../services/mailService.js';
import MailFullDisplay from './MailDetails/MailFullDisplay.jsx'

export default class MailDetails extends React.Component {
    state = {
        mail: null
    }

    loadMail = () => {
        mailService.getMailById(this.props.match.params.id).then(foundMail => this.setState(() => ({ mail: foundMail })));
    }

    componentDidMount() {
        this.loadMail();
    }

    render() {
        const { mail } = this.state;
        if (!mail) return <div>Could not find mail</div>;
        return (<MailFullDisplay history={ this.props.history } mail={ this.state.mail } reloadMail={ this.loadMail } isFromPreview={ false } />);
    }
}