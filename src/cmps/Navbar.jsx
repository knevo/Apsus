import React from 'react'
import MenusToggler from './Modal/MenusToggler.jsx';
import SearchBox from './Navbar/SearchBox.jsx';
import MainNavLinks from './Navbar/MainNavLinks.jsx';

export default class Navbar extends React.Component {
    state = {
        currAppMenuOpen: false
    }

    toggleCurrAppMenu = () => {
        if (!window.location.pathname.includes('/mail') || document.body.offsetWidth > 700) return;
        this.setState((prevState) => ({ currAppMenuOpen: !prevState.currAppMenuOpen }));
    }

    render() {
        return (
            <nav className={ "main-nav flex align-center" + (this.state.currAppMenuOpen ? ' sub-menu-open' : '') }>
                { this.state.currAppMenuOpen ? <MenusToggler closeMenu={ this.toggleCurrAppMenu } /> : '' }
                <div className="main-nav-logo"><img alt='' src="images/logo.png" onClick={ this.toggleCurrAppMenu } /></div>
                <SearchBox />
                <MainNavLinks />
            </nav>);
    }
}