import React from 'react'
export default function MediaAddBtns(props) {
    return <div className="media-type">
        <label htmlFor="media" className={ (props.currType === 'video') ? 'active-type' : (props.currType === 'img') ? 'active-type' : (props.currType === 'maps') ? 'active-type' : (props.currType === 'music') ? 'active-type' : '' }>
            <i className="fas fa-photo-video"></i></label>
        <input type="radio" name='type' id="media" />

        <div className="media-btns flex column center">
            <label htmlFor="img" className={ (props.currType === 'img') ? 'active-type' : '' }>
                <i className="fas fa-image"></i></label>
            <input onChange={ props.handleClick } type='radio' id='img' name='type' value='img' />
            <label htmlFor="video" className={ (props.currType === 'video') ? 'active-type' : '' }>
                <i className="fas fa-video"></i></label>
            <input onChange={ props.handleClick } type='radio' id='video' name='type' value='video' />
            <label htmlFor="maps" className={ (props.currType === 'maps') ? 'active-type' : '' }>
                <i className="fas fa-map-marked-alt"></i></label>
            <input onChange={ props.handleClick } type='radio' id='maps' name='type' value='maps' />
            <label htmlFor="music" className={ (props.currType === 'music') ? 'active-type' : '' }>
                <i className="fas fa-music"></i></label>
            <input onChange={ props.handleClick } type='radio' id='music' name='type' value='music' />
        </div>
    </div>
}