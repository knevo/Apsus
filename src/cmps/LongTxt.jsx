import React from 'react'
export default class LongTxt extends React.Component {
    state = {
        isSliced: false
    }

    handleClick = () => {
        this.setState(prevState => ({ isSliced: !prevState.isSliced }));
    }

    getToggleLinkStr = () => {
        return this.props.bookDescription.length <= this.props.strLength ? '' :
            <span className="long-text-toggler" onClick={ this.handleClick }>{ this.state.isSliced ? 'Show More' : 'Show Less' }</span>;
    }

    getText = () => {
        return this.props.bookDescription.length <= this.props.strLength ? this.props.bookDescription :
            (this.state.isSliced ? this.props.bookDescription.slice(0, this.props.strLength) + '...' : this.props.bookDescription);
    }

    render() {
        return (<p>{ this.getText() }{ this.getToggleLinkStr() }</p>);
    }
}