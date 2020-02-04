import React from 'react'
import NotePreview from './NotePreviews/NotePreview.jsx'
export default function NoteList(props) {

    return <div className={ (props.pinnedNotes) ? 'pinned-container flex' : 'notes-container' }>
        { props.notes.map(note => (note.id !== 'draft') && <div style={ { backgroundColor: note.style.backgroundColor } } key={ note.id } className='note'><NotePreview textStyle={ note.style } reloadNotes={ props.handleReload } handleUpdate={ props.handleUpdate } note={ note }></NotePreview>

        </div>) }
    </div>

}