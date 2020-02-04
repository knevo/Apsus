import React from 'react'
import ColorPicker from "./ColorPicker.jsx";

export default class ToolBar extends React.Component {
    state = {
        BG_COLORS: ['#ff4040cc', 'green', '#2222f0cf', 'lightsalmon', 'violet', '#FFFF88'],
        TEXT_COLORS: ['black', 'violet', 'green', 'yellow', 'cyan', 'white']
    }

    onChangeBgColor = (newColor) => {
        this.props.handleUpdate({
            style: {
                backgroundColor: newColor
            }
        })
    }

    onUpdateTextColor = (newColor) => {
        this.props.handleUpdate({
            style: {
                color: newColor
            }
        })
    }
    render() {
        return <form className='tool-bar'>
            <ColorPicker icon={ 'fas fa-palette palette' } colors={ this.state.BG_COLORS } handleChange={ this.onChangeBgColor } noteId={ this.props.noteId }></ColorPicker>

            <ColorPicker icon={ 'fas fa-font palette' } colors={ this.state.TEXT_COLORS } isText={ true } handleChange={ this.onUpdateTextColor } noteId={ this.props.noteId }></ColorPicker>

            <label className='hover-btn' onClick={ this.props.handleSendToMail }>
                <i className="fas fa-paper-plane"></i></label>
        </form>
    }

}