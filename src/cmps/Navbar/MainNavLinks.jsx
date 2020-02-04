import React from 'react'
import { NavLink } from 'react-router-dom'
import MenusToggler from '../Modal/MenusToggler.jsx';

export default class MainNavLinks extends React.Component {
    state = { isMenuOpen: false };

    toggleMenu = () => {
        this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
    }

    render() {
        return (
            <div className="main-nav-links">
                <button className="simple-button" onClick={ this.toggleMenu }><svg className="gb_Se" focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg></button>
                <ul className={ 'main-nav-links-list clean-list flex space-between normal-trans' + (this.state.isMenuOpen ? ' open' : '') } onMouseOut={ this.moveOutside }>
                    <li><NavLink activeClassName="active" to='/' exact onClick={ this.toggleMenu }><i className="fas fa-home"></i>Home</NavLink></li>
                    <li><NavLink activeClassName="active" to='/books' onClick={ this.toggleMenu }><i className="fas fa-book"></i>Books</NavLink></li>
                    <li><NavLink activeClassName="active" to='/keep' onClick={ this.toggleMenu }><i className="far fa-sticky-note"></i>Keep</NavLink></li>
                    <li><NavLink activeClassName="active" to='/mail' onClick={ this.toggleMenu }><i className="far fa-envelope"></i>Mail</NavLink></li>
                </ul>
                { this.state.isMenuOpen ? <MenusToggler closeMenu={ this.toggleMenu } /> : '' }
            </div>);
    }
}