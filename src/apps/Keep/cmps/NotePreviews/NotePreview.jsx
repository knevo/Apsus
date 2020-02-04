import React from 'react'
import { updateNoteById, deleteNote, togglePin } from '../../services/keepService.js'
import eventBusService from '../../../../services/eventBusService.js'
import mapNotePreview from "./mapNotePreview.js"

import TitleInput from "./TitleInput.jsx"
import DeleteBtn from './DeleteBtn.jsx'
import PinBtn from './PinBtn.jsx'
import ToolBar from "./ToolBar.jsx"


export default class NotePreview extends React.Component {

    getPreviewCmp(note) {
        const Preview = mapNotePreview[note.type]
        return <Preview note={ note } handleUpdate={ this.onUpdate }></Preview>
    }

    onUpdate = (updatedFields) => {
        updateNoteById(this.props.note.id, updatedFields).then(this.props.reloadNotes)
    }

    onDeleteNote = () => {
        eventBusService.callModal('confirmation', { onConfirmAction: this.deleteNote, message: 'Are you sure you want to delete this Note?' });
    }

    deleteNote = () => {
        deleteNote(this.props.note.id).then(this.props.reloadNotes)
        eventBusService.callModal('updatesBox', { type: 'failure', message: 'Note deleted Successfully!' });
    }

    onPinNote = () => {
        togglePin(this.props.note.id).then(this.props.reloadNotes)
    }

    onSendToMail = () => {
        const { note } = this.props
        let content;
        switch (note.type) {
            case 'img':
            case 'video':
            case 'music':
                content = note.details.url
                break;
            case 'txt':
                content = note.details.txt
                break;
            case 'todo':
                content = note.details.todos.map(todo => todo.txt)
                content = content.join(',')
                break;
            default:
                break;
        }
        window.open(`#/mail/action/sendNote?type=${note.type}&subject=${note.title}&content=${content}`, '_blank');
    }

    render() {
        const { note } = this.props
        return <React.Fragment>
            <div style={ { color: this.props.textStyle.color } } className='note-title'>
                <TitleInput style={ note.style } handleUpdate={ this.onUpdate } title={ note.title }></TitleInput>
            </div>
            <div style={ { color: this.props.textStyle.color } } className="note-body">
                { this.getPreviewCmp(note) }
            </div>

            <PinBtn isPinned={ note.isPinned } handlePin={ this.onPinNote }></PinBtn>
            <DeleteBtn handleDelete={ this.onDeleteNote }></DeleteBtn>
            <ToolBar handleSendToMail={ this.onSendToMail } handleUpdate={ this.onUpdate } noteId={ note.id }></ToolBar>

        </React.Fragment>
    }

}
