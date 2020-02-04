import React from 'react'
export default function PinBtn(props) {
    function onPin() {
        props.handlePin(props.noteId)
    }

    return <span className={ `pin-btn hover-btn ${props.isPinned ? 'pinned' : ''}` } onClick={ onPin }>
        <i className="fas fa-thumbtack"></i>
    </span>
}