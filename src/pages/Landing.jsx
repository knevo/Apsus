import React from 'react'
export default class Home extends React.Component {
    render() {
        return (
            <div className='landing-container'>
                <div className="landing-block main">
                    <img alt='logo' src="images/logo.png" />
                    <h1>Appsus</h1>
                    <h2>Three powerful Apps in a single place - Simple and Elegant.</h2>
                </div>
                <div className='landing-block books'>
                    <div className="block-text">
                        <h2>Books</h2>
                        <h4>All the Books are just one click away!</h4>
                    </div>
                </div>
                <div className='landing-block keep'>
                    <div className="block-text">
                        <h2>Keep</h2>
                        <h4>Keep and save everything you wish!</h4>
                    </div>
                </div>
                <div className='landing-block mail'>
                    <div className="block-text">
                        <h2>Mail</h2>
                        <h4>Powerful mail app - with all features needed.</h4>
                    </div>
                </div>
            </div>);
    }
}