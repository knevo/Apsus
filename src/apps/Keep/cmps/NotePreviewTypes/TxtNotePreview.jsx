import React from 'react'
import ResizeableTextArea from "../ResizableTextArea.jsx";

export default class TxtNotePreview extends React.Component {

    render() {
        return <ResizeableTextArea handleUpdate={ this.props.handleUpdate } defaultText={ this.props.note.details.txt }></ResizeableTextArea>
    }

}
