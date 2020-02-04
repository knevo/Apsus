import React from 'react'
import ResizeableTextArea from "../ResizableTextArea.jsx";

export default class TitleInput extends React.Component {
    state = {
        title: '',
    }

    onTitleChange = (ev) => {
        this.props.handleUpdate({ title: ev.details.txt })
    }

    render() {
        return <ResizeableTextArea handleUpdate={ this.onTitleChange } defaultText={ this.props.title }></ResizeableTextArea>
    }
}
