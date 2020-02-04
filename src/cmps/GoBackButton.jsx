import React from 'react'
export default function GoBackButton(props) {
    return <button onClick={ props.onReturn } className="go-back-button simple-button abs-tl medium-button"><i className="fas fa-arrow-circle-left"></i></button>
}